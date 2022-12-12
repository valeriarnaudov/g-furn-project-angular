import IUser from "./user.interface";

export default interface IPost {
    id?: string;
    img: string;
    title: string;
    description: string;
    category: string;
    owner: IUser;
}