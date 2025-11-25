import { LocalDeixou } from "../enums/LocalDeixou";

export interface ItemData {
    id?: number;
    nome: string;
    descricao: string;
    imagem: string;
    localAchou: string;
    localDeixou: LocalDeixou;
    data: string;
    matriculaAchou: string;
}
