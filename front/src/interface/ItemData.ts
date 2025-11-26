import { LocalDeixou } from "../enums/LocalDeixou";
import { StatusItem } from "../enums/StatusItem";

export interface ItemData {
    id?: number;
    nome: string;
    descricao: string;
    imagem: string;
    localAchou: string;
    localDeixou: LocalDeixou;
    data: string;
    matriculaAchou: string;
    statusItem: StatusItem;
}
