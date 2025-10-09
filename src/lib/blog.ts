export type Blogs = { id: string; name: string; text: string };

const DB: Blogs[] = [
    {
        id: "1",
        name: "Clavier Mécanique",
        text: "laaaaaaaaaaaaaaaaaaaaadefnajegbahvgfvscbasjicnsaodnj",
    },
    {
        id: "2",
        name: "Clavier Bureautique",
        text: "laaaaaaaaaaaaaaaaaaaaadefnajegbahvgfvscbasjicnsaodnj",
    },
];

export const Blogs = {
    list: (): Blogs[] => DB,
    get: (id: string): Blogs | undefined => DB.find((p) => p.id === id),
};
