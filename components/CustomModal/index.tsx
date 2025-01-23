import { Modal } from "antd";
import React from "react";

const CustomModal = ({ children, open, title }: { children: any; open: boolean, title?: string }) => {
  return <Modal open={open} footer={null} closeIcon={null} centered title={title}>{children}</Modal>;
};

export default CustomModal;
