'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useParams from next/navigation
import Image from 'next/image';

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the dynamic route parameter

  // Load Midtrans Snap.js script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch product data based on the ID (only after id is available)
  useEffect(() => {
    if (id && product === null) { // Ensure product is not already fetched
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/products/${id}`);
          const data = await res.json();
          if (data) {
            setProduct(data);
          } else {
            router.push('/404'); // Redirect if product not found
          }
        } catch (err) {
          console.error('Failed to fetch product:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, product, router]); // Add product to dependencies to prevent re-fetching

  const handlePay = async () => {
    try {
      const orderId = `ORDER-${Date.now()}`;
      const grossAmount = product.price;

      // 1. Create order before requesting token
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: orderId,
          productId: id,
          name: product.name,
          price: grossAmount,
          paymentStatus: 'pending',
          createdAt: new Date().toISOString(),
        }),
      });

      if (!orderRes.ok) {
        console.error('❌ Failed to create order');
        return;
      }

      const res = await fetch('/api/payment/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, grossAmount }),
      });

      const data = await res.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: (result) => {
            console.log('✅ Payment success:', result);
          },
          onPending: (result) => {
            console.log('⌛ Payment pending:', result);
          },
          onError: (result) => {
            console.error('❌ Payment error:', result);
          },
          onClose: () => {
            console.log('💨 Payment popup closed');
          },
        });
      } else {
        console.error('No transaction token returned:', data);
      }
    } catch (error) {
      console.error('Error during Snap transaction:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading product...</p>
      ) : (
        product && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">{product.name}</h1>
            <Image
              src={`https://picsum.photos/200?random=${id}`} // Dynamic image
              alt={product.name}
              width={400}
              height={300}
              className="rounded mb-6"
            />
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-600 text-lg mb-4">Price: Rp{product.price.toLocaleString('id-ID')}</p>
            <button
              onClick={handlePay}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        )
      )}
    </div>
  );
}
