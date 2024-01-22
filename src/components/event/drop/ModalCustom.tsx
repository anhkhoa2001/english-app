import { Modal } from "antd";

const ModalCustom: React.FC<{config: {title: string, content: string}}> = ({config}) => {
  const onDisplayModal = () => {
    Modal.error(config);
  }

  onDisplayModal();
  return <div className="modal">
  </div>
}

export default ModalCustom;