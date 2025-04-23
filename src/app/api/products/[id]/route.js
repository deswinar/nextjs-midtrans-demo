import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'src/data/products.json');

// Helper functions to handle reading and writing products
const readProducts = () => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Products file not found');
  }
  const file = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(file);
};

const writeProducts = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Handling GET request for a product by its id
export async function GET(req, { params }) {
  try {
    // Await params to ensure async access
    const { id } = await params;

    const products = readProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Handling PUT request to update a product by its id
export async function PUT(req, { params }) {
  try {
    // Await params to ensure async access
    const { id } = await params;

    const body = await req.json();
    const products = readProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    products[index] = { ...products[index], ...body };
    writeProducts(products);

    return NextResponse.json({ message: 'Product updated', product: products[index] });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Handling DELETE request to remove a product by its id
export async function DELETE(req, { params }) {
  try {
    // Await params to ensure async access
    const { id } = await params;

    const products = readProducts();
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    writeProducts(filtered);

    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
