import React from "react";
import Table from "../../Components/Table/Table";
function DashProducts() {
  const Products = [
    {
      _id: "65ab99e7e9277eaa5434570d",
      name: "kabseh",
      name_AR: "الكبسة",
      description: "description ....",
      description_AR: "مواصفات ....",
      price: 1.85,
      image: "image-1705744871927-24236543.jpeg",
      ingredients:
        "2renfol , erfe , heil , lumi , kari , kamoun , felfol aswed , kezbra , joz tib , kerkom , flayfle khechen wasat",
      ingredients_AR:
        "قرنفل , قرفة , هيل , لومي , كاري , كمون , فلفل أسود , كزبرة , جوزة الطيب , كركم , فليفلة خشن أسود",
      stock: true,
      note: "note......",
      note_AR: "ملاحظة",
      display: true,
      slug: "kabseh",
      category: {
        _id: "659ecc88bb243d881dcbc90b",
        name: "Eastern & Western",
      },
      color: {
        _id: "659ed5e968df6e614bc00e51",
        hex: "#740004",
        createdAt: "2024-01-10T17:37:45.761Z",
        updatedAt: "2024-01-26T08:29:49.101Z",
        __v: 0,
        name: "Burgundy Red",
      },
      createdAt: "2024-01-20T10:01:11.936Z",
      updatedAt: "2024-01-25T16:54:46.394Z",
      __v: 0,
      quantity: 50,
      weight: 50,
    },
    {
      _id: "65ab9ef1199052513072d165",
      name: "Beryani",
      name_AR: "برياني",
      description: "description ....",
      description_AR: "مواصفات ....",
      price: 1.85,
      quantity: 50,
      image: "image-1705746161677-869432798.jpeg",
      ingredients:
        "2renfol , erfe , heil , bhar helou , lumi , kamoun , zanjabil , felfol aswed , kezbra , joz tib , kerkom , 3esfor , flayfle khechen wasat",
      ingredients_AR:
        "قرنفل , قرفة , هيل , بهار حلو , لومي , كمون , زنجبيل , فلفل أسود , كزبرة , جوزة الطيب , كركم , عصفر , فليفلة خشن أسود",
      stock: true,
      note: "note......",
      note_AR: "ملاحظة",
      display: true,
      slug: "beryani",
      category: {
        _id: "659ecc88bb243d881dcbc90b",
        name: "Eastern & Western",
      },
      color: {
        _id: "659ed5e968df6e614bc00e51",
        hex: "#740004",
        createdAt: "2024-01-10T17:37:45.761Z",
        updatedAt: "2024-01-26T08:29:49.101Z",
        __v: 0,
        name: "Burgundy Red",
      },
      createdAt: "2024-01-20T10:22:41.687Z",
      updatedAt: "2024-01-25T16:56:31.561Z",
      __v: 0,
      weight: 50,
    },
  ];

  return (
    <div
      style={{
        marginLeft: "5rem",
      }}
    >
      <Table data={Products} ForWhat={"products"} v isEdit={true} />
    </div>
  );
}

export default DashProducts;
