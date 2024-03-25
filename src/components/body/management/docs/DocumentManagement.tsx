import { useEffect, useRef, useState } from "react";
import { DocumentDTO } from "../../../../entity/props/DocumentDTO";
import { Button, Image, Modal, Space, Switch, Table, TableProps, Tag } from "antd";
import moment from "moment";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import DocumentForm from "../form/DocumentForm";
import { MessageResponse } from "../../../../entity/response/MessageResponse";
import { ModalCustom } from "../../../exception/SuccessModal";
import DocumentService from "../../../../service/DocumentService";

const ADD_DOC = 'ADD_DOC';
const EDIT_DOC = 'EDIT_DOC';
const modal = new Map();
modal.set(ADD_DOC, false);
modal.set(EDIT_DOC, false);


const DocumentManagement: React.FC = () => {
    const docFormRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(modal);
    const [docs, setDocs] = useState<DocumentDTO[]>([]);
    const docRef = useRef<DocumentDTO>();

    const showModalAdd = (key: string) => {
        modal.set(key, true);
        const newMap = new Map(modal);
        setIsModalOpen(newMap);
    };

    const change = (e:any) => {

    }

    const getAll: (data: MessageResponse<DocumentDTO[]> | null) => void = (data) => {
        try {
            setDocs(data?.data || []);
            console.log('data blogs', data?.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        DocumentService.getAllDocument(getAll);
    }, []);


    const handleTypeBlog = (input: string, color: string) => {
        return input.split(',').map(i => {
            return <Tag color={color}>
                    {i.toUpperCase()}
                </Tag>;
        });
    }
      
    const columns: TableProps<DocumentDTO>['columns']= [
    {
        title: 'ID',
        dataIndex: 'documentId',
        key: 'documentId',
    },
    {
        title: 'Document Name',
        dataIndex: 'documentName',
        key: 'documentName',
    },
    {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (url) => <Image
            width={120}
            src={url}
        />
    },
    {
        title: 'Link Resource',
        dataIndex: 'link',
        key: 'link',
        render: (text) => <a href={text}>resource</a>
    },
    {
        title: 'Skill',
        dataIndex: 'skill',
        key: 'skill',
        render: (text) => <>{handleTypeBlog(text, 'blue')}</>
    },
    {
        title: 'Topic',
        dataIndex: 'topic',
        key: 'topic',
        render: (text) => <>{handleTypeBlog(text, 'red')}</>
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (pub) => <Switch checked={pub} disabled />
    },
    {
        title: 'Create At',
        dataIndex: 'createAt',
        key: 'createAt',
        render: (value: Date) => `${moment(value).format('DD-MM-YYYY HH:mm:ss')}`,
    },
    {
        title: 'Create By',
        dataIndex: 'createBy',
        key: 'createBy',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, e) => (
            <Space size="middle">
                <Button onClick={() => {
                    docRef.current = e;
                    showModalAdd(EDIT_DOC);
                }}  icon={<EditOutlined />} />
            </Space>
        ),
    },
    ];

    const handleOk = (key: string) => {
        modal.set(key, false);
        const newMap = new Map(modal);
        setIsModalOpen(newMap);
    };

    const handleCancel = (key: string) => {
        modal.set(key, false);
        const newMap = new Map(modal);
        setIsModalOpen(newMap);
    };

    const submitFormAddDocument = (e: any) => {
        console.log('submit blog', e);

        const create: (data: MessageResponse<DocumentDTO> | null) => void = (data) => {
            try {
                handleOk(ADD_DOC);
                ModalCustom.onDisplaySuccess('Success', 'Success');
                DocumentService.getAllDocument(getAll);
            } catch (error) {
                console.log('error', error);
            }
        }

        DocumentService.createDocument(e, create);
    }


    const submitFormEditBlog = (e: any) => {
        console.log('submit edit blog', e);

        const update: (data: MessageResponse<DocumentDTO> | null) => void = (data) => {
            try {
                handleOk(EDIT_DOC);
                ModalCustom.onDisplaySuccess('Success', 'Success');
                DocumentService.getAllDocument(getAll);
            } catch (error) {
                console.log('error', error);
            }
        }

        DocumentService.updateDocument(e, update);
    }

    return <div className="blog-management">
        <span className="title">All Documents</span>
        <span className="add-course">
            <Button type="primary"  icon={<PlusOutlined />} onClick={() => showModalAdd(ADD_DOC)}>
                Add Document
            </Button>
        </span>
        <Table columns={columns} dataSource={docs} 
            style={{ width: 1300 }}  
            onChange={change} />

         <Modal title="Add New Document"
            open={isModalOpen.get(ADD_DOC)}
            onOk={() => {
                //@ts-ignore
                docFormRef.current?.submit();
            }}
            onCancel={() => handleCancel(ADD_DOC)}
            okText='Submit'
            width={1200}>
            <DocumentForm onSubmit={submitFormAddDocument} docFormRef={docFormRef} />
        </Modal>

        <Modal title="Add Edit Document"
            open={isModalOpen.get(EDIT_DOC)}
            onOk={() => {
                //@ts-ignore
                docFormRef.current?.submit();
            }}
            onCancel={() => handleCancel(EDIT_DOC)}
            okText='Submit'
            width={1200}>
            <DocumentForm onSubmit={submitFormEditBlog} docFormRef={docFormRef} item={docRef.current} />
        </Modal>
    </div>
}


export default DocumentManagement;