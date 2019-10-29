interface Tag {
    begin: string;
    end?: string;
}
interface Options {
    tags?: Tag[];
    include?: string | string[];
    exclude?: string | string[];
}
declare const scrub: ({ tags, include, exclude }?: Options) => {
    name: string;
    transform: (code: string, id: string) => string | undefined;
};
export default scrub;
