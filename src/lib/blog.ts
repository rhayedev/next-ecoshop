export type Blogs = { id: string; name: string; text: string };

const DB: Blogs[] = [
    {
        id: "1",
        name: "Quels clavier choisir ?",
        text: "laaaaaaaaaaaaaaaaaaaaadefnajegbahvgfvscbasjicnsaodnj",
    },
    {
        id: "2",
        name: "Quel ?",
        text: "laaaaaaaaaaaaaaaaaaaaadefnajegbahvgfvscbasjicnsaodnj",
    },
];

export const Blogs = {
    list: (): Blogs[] => DB,
    get: (id: string): Blogs | undefined => DB.find((p) => p.id === id),
};
