import { Modal } from "antd";

export const ModalCustom = {
    onDisplaySuccess: (message: string, detail: string) => {
        Modal.success({
            title: message,
            content: detail,
        });
    },
    onDisplayError: (message: string, detail: string) => {
        Modal.error({
            title: message,
            content: detail,
        });
    }
}