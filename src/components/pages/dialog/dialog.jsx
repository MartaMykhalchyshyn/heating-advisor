import React from 'react';
import { Modal } from 'antd';


const dialog = ({ isModalVisible, handleOk, handleCancel, product }) => {

    return (
        <>
            <Modal 
                title="Remove product" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                okText='Yes' 
                cancelText='No'
            >
                <div className="modal-text">
                    Are you sure you want to remove {product?.name}from favorites list?
                </div>
            </Modal>
        </>
    );
}

export default dialog
