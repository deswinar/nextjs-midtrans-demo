import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src/data/products.json");

const readProducts = () => {
  const file = fs.readFileSync(filePath);
  return JSON.parse(file);
};

const writeProducts = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(req) {
  const body = await req.json();
  const products = readProducts();

  // Basic ID auto-generation
  const newId = "P" + String(Date.now());
  const newProduct = { id: newId, ...body };

  products.push(newProduct);
  writeProducts(products);

  return NextResponse.json({ message: "Product created", product: newProduct });
}
