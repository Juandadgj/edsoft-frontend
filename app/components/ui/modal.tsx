import { Modal as AntModal } from "antd";
import React from "react";

const Modal = ({
  children,
  open,
  title,
  close,
}: {
  children: any;
  open: boolean;
  title?: string;
  close?: any;
}) => {
  return (
    <AntModal maskClosable={true} open={open} footer={null} closeIcon={null} centered title={title} styles={{
      body: {
        background: "var(--color-base-200)"
      },
      container : {
        background: "var(--color-base-200)"
      },
      title: {
        color: "var(--color-foreground)"
      }
    }}>
      {children}
    </AntModal>
  );
};

export default Modal;
