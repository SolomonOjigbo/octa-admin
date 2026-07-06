// src/feature-module/admin/common/CrudPage.tsx
//
// CrudTable: reusable table + field-driven create/edit modal + delete + custom row
// actions, with no page chrome — embeddable inside tabs/cards.
// CrudPage: CrudTable wrapped in the standard page header/card.

import React, { useState } from "react";
import {
  Card, Table, Button, Modal, Form, Input, InputNumber, Select, Switch, Popconfirm, Space, message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

export interface CrudField {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "switch";
  options?: { value: any; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export interface CrudTableProps {
  /** Singular noun for modal titles, e.g. "Category" -> "New Category". */
  title?: string;
  rows: any[];
  loading?: boolean;
  columns: any[];
  idKey?: string;
  rowKey?: string | ((r: any) => string);
  fields?: CrudField[];
  onCreate?: (values: any) => Promise<any>;
  onUpdate?: (id: string, values: any) => Promise<any>;
  onDelete?: (id: string) => Promise<any>;
  createLabel?: string;
  extraActions?: (record: any) => React.ReactNode;
  toolbar?: React.ReactNode;
  card?: boolean;
}

const renderField = (f: CrudField) => {
  switch (f.type) {
    case "textarea": return <Input.TextArea rows={2} placeholder={f.placeholder} />;
    case "number": return <InputNumber style={{ width: "100%" }} placeholder={f.placeholder} />;
    case "select": return <Select options={f.options} placeholder={f.placeholder} optionFilterProp="label" showSearch allowClear />;
    case "switch": return <Switch />;
    default: return <Input placeholder={f.placeholder} />;
  }
};

export const CrudTable: React.FC<CrudTableProps> = ({
  title = "Record", rows, loading, columns, idKey = "id", rowKey,
  fields, onCreate, onUpdate, onDelete, createLabel = "New", extraActions, toolbar, card = true,
}) => {
  const [form] = Form.useForm();
  const [modal, setModal] = useState<{ open: boolean; editing?: any }>({ open: false });
  const [saving, setSaving] = useState(false);

  const canEdit = Boolean(fields && onUpdate);
  const canCreate = Boolean(fields && onCreate);
  const hasActions = canEdit || Boolean(onDelete) || Boolean(extraActions);

  const openCreate = () => { form.resetFields(); setModal({ open: true }); };
  const openEdit = (record: any) => {
    const vals: any = {};
    (fields ?? []).forEach((f) => { vals[f.name] = record[f.name]; });
    form.setFieldsValue(vals);
    setModal({ open: true, editing: record });
  };

  const submit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      if (modal.editing && onUpdate) await onUpdate(modal.editing[idKey], values);
      else if (onCreate) await onCreate(values);
      message.success(modal.editing ? "Saved" : "Created");
      setModal({ open: false });
      form.resetFields();
    } catch (e: any) {
      if (e?.errorFields) return;
      message.error(e?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const allColumns = hasActions
    ? [
        ...columns,
        {
          title: "Actions",
          key: "__actions",
          render: (_: any, record: any) => (
            <Space size={4}>
              {extraActions?.(record)}
              {canEdit && <Button size="small" type="link" onClick={() => openEdit(record)}>Edit</Button>}
              {onDelete && (
                <Popconfirm
                  title="Delete this record?"
                  okButtonProps={{ danger: true }}
                  onConfirm={async () => { try { await onDelete(record[idKey]); message.success("Deleted"); } catch { message.error("Delete failed"); } }}
                >
                  <Button size="small" type="link" danger>Delete</Button>
                </Popconfirm>
              )}
            </Space>
          ),
        },
      ]
    : columns;

  const table = (
    <Table
      rowKey={rowKey ?? ((r: any) => r[idKey] ?? JSON.stringify(r).slice(0, 40))}
      columns={allColumns}
      dataSource={rows}
      loading={loading}
      size="small"
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 15, showSizeChanger: true }}
    />
  );

  return (
    <>
      {(toolbar || canCreate) && (
        <div className="d-flex justify-content-end align-items-center mb-2">
          <Space>
            {toolbar}
            {canCreate && <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>{createLabel}</Button>}
          </Space>
        </div>
      )}

      {card ? <Card bodyStyle={{ padding: 12 }}>{table}</Card> : table}

      {fields && (
        <Modal
          title={modal.editing ? `Edit ${title}` : `New ${title}`}
          open={modal.open}
          onCancel={() => setModal({ open: false })}
          onOk={submit}
          okButtonProps={{ loading: saving }}
          okText="Save"
        >
          <Form form={form} layout="vertical">
            {fields.map((f) => (
              <Form.Item
                key={f.name}
                name={f.name}
                label={f.label}
                valuePropName={f.type === "switch" ? "checked" : "value"}
                rules={f.required ? [{ required: true, message: `${f.label} is required` }] : undefined}
              >
                {renderField(f)}
              </Form.Item>
            ))}
          </Form>
        </Modal>
      )}
    </>
  );
};

export interface CrudPageProps extends CrudTableProps {
  title: string;
  subtitle?: string;
}

const CrudPage: React.FC<CrudPageProps> = ({ title, subtitle, toolbar, ...rest }) => (
  <div className="page-wrapper">
    <div className="content">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="mb-1">{title}</h4>
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </div>
      </div>
      <CrudTable title={title} toolbar={toolbar} {...rest} />
    </div>
  </div>
);

export default CrudPage;
