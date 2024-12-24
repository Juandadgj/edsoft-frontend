import { Modal } from "antd";
import React from "react";

const CustomModal = ({ children, open }: { children: any; open: boolean }) => {
  return <Modal open={open} footer={null} closeIcon={null} centered>{children}</Modal>;
};

export default CustomModal;
