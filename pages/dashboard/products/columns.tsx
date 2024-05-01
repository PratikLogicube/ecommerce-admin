
"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Product = {
  image: string;
    title: string;
    category: string;
    price: number;
  }

export const columns: ColumnDef<Product[]>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell(props) {
      return <div className="relative w-20 aspect-square">
        <Image src={props.getValue() as any} alt="abc" fill />
      </div>
    },
  },
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
]


