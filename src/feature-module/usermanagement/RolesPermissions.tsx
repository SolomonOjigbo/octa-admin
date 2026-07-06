// src/feature-module/usermanagement/RolesPermissions.tsx
//
// Platform roles & permissions management (replaces the mock rolespermissions.jsx).
// Fully RTK Query: manage system roles, the permission catalog, and per-role
// permission assignment.

import React, { useMemo, useState } from "react";
import {
  Card, Table, Button, Modal, Form, Input, Tag, Select, Popconfirm, message, Empty, Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useGetSystemRolesQuery,
  useGetPermissionsQuery,
  useCreateSystemRoleMutation,
  useUpdateSystemRoleMutation,
  useDeleteSystemRoleMutation,
  useCreatePermissionMutation,
  useAssignPermissionMutation,
  useRemovePermissionMutation,
  AdminRole,
} from "../../core/redux/services/adminRoleApi";

const RolesPermissions: React.FC = () => {
  const { data: roles = [], isFetching: rolesLoading } = useGetSystemRolesQuery();
  const { data: permissions = [] } = useGetPermissionsQuery();

  const [createRole, { isLoading: creatingRole }] = useCreateSystemRoleMutation();
  const [updateRole] = useUpdateSystemRoleMutation();
  const [deleteRole] = useDeleteSystemRoleMutation();
  const [createPermission, { isLoading: creatingPerm }] = useCreatePermissionMutation();
  const [assignPermission] = useAssignPermissionMutation();
  const [removePermission] = useRemovePermissionMutation();

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [roleModal, setRoleModal] = useState<{ open: boolean; editing?: AdminRole }>({ open: false });
  const [permModal, setPermModal] = useState(false);
  const [roleForm] = Form.useForm();
  const [permForm] = Form.useForm();

  const selectedRole = useMemo(
    () => roles.find((r) => r.id === selectedRoleId) || null,
    [roles, selectedRoleId]
  );
  const assignedIds = new Set((selectedRole?.permissions ?? []).map((p) => p.id));
  const assignableOptions = permissions
    .filter((p) => !assignedIds.has(p.id))
    .map((p) => ({ value: p.id, label: p.name }));

  const submitRole = async () => {
    try {
      const v = await roleForm.validateFields();
      if (roleModal.editing) {
        await updateRole({ id: roleModal.editing.id, name: v.name, description: v.description }).unwrap();
        message.success("Role updated");
      } else {
        await createRole({ name: v.name, description: v.description }).unwrap();
        message.success("Role created");
      }
      roleForm.resetFields();
      setRoleModal({ open: false });
    } catch (e: any) {
      if (e?.errorFields) return;
      message.error(e?.data?.message || "Couldn't save role");
    }
  };

  const submitPerm = async () => {
    try {
      const v = await permForm.validateFields();
      await createPermission({ name: v.name, description: v.description }).unwrap();
      message.success("Permission created");
      permForm.resetFields();
      setPermModal(false);
    } catch (e: any) {
      if (e?.errorFields) return;
      message.error(e?.data?.message || "Couldn't create permission");
    }
  };

  const roleColumns = [
    { title: "Role", dataIndex: "name", render: (n: string) => <strong>{n}</strong> },
    { title: "Description", dataIndex: "description", render: (d: string) => d || <span className="text-muted">—</span> },
    {
      title: "Permissions",
      key: "perms",
      render: (_: any, r: AdminRole) => <Tag>{r.permissions?.length ?? 0}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, r: AdminRole) => (
        <Space>
          <Button size="small" type="link" onClick={() => setSelectedRoleId(r.id)}>Manage</Button>
          <Button size="small" type="link" onClick={() => { setRoleModal({ open: true, editing: r }); roleForm.setFieldsValue({ name: r.name, description: r.description }); }}>Edit</Button>
          <Popconfirm title="Delete this role?" onConfirm={async () => { try { await deleteRole(r.id).unwrap(); if (selectedRoleId === r.id) setSelectedRoleId(null); message.success("Role deleted"); } catch { message.error("Delete failed"); } }}>
            <Button size="small" type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="mb-3">
          <h4 className="mb-1">Roles &amp; Permissions</h4>
          <p className="text-muted mb-0">Platform-wide role and permission management</p>
        </div>

        <div className="row g-3">
          <div className="col-lg-7">
            <Card
              title="System Roles"
              extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setRoleModal({ open: true }); roleForm.resetFields(); }}>New Role</Button>}
            >
              <Table
                rowKey="id"
                columns={roleColumns}
                dataSource={roles}
                loading={rolesLoading}
                pagination={{ pageSize: 10 }}
                rowClassName={(r) => (r.id === selectedRoleId ? "bg-light" : "")}
                onRow={(r) => ({ onClick: () => setSelectedRoleId(r.id) })}
              />
            </Card>
          </div>

          <div className="col-lg-5">
            <Card title={selectedRole ? `Permissions · ${selectedRole.name}` : "Permissions"} className="mb-3">
              {!selectedRole ? (
                <Empty description="Select a role to manage its permissions" />
              ) : (
                <>
                  <div className="mb-3">
                    {(selectedRole.permissions ?? []).length === 0 && <span className="text-muted">No permissions assigned.</span>}
                    {(selectedRole.permissions ?? []).map((p) => (
                      <Tag
                        key={p.id}
                        closable
                        className="mb-1"
                        onClose={async (e) => {
                          e.preventDefault();
                          try { await removePermission({ roleId: selectedRole.id, permissionId: p.id }).unwrap(); } catch { message.error("Couldn't remove"); }
                        }}
                      >
                        {p.name}
                      </Tag>
                    ))}
                  </div>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Assign a permission…"
                    optionFilterProp="label"
                    value={null}
                    options={assignableOptions}
                    onChange={async (permissionId) => {
                      try { await assignPermission({ roleId: selectedRole.id, permissionId }).unwrap(); }
                      catch { message.error("Couldn't assign"); }
                    }}
                  />
                </>
              )}
            </Card>

            <Card
              title="Permission Catalog"
              extra={<Button size="small" icon={<PlusOutlined />} onClick={() => { setPermModal(true); permForm.resetFields(); }}>New</Button>}
            >
              <Table
                rowKey="id"
                size="small"
                columns={[
                  { title: "Name", dataIndex: "name" },
                  { title: "Description", dataIndex: "description", render: (d: string) => d || "—" },
                ]}
                dataSource={permissions}
                pagination={{ pageSize: 8 }}
              />
            </Card>
          </div>
        </div>
      </div>

      <Modal
        title={roleModal.editing ? "Edit Role" : "New Role"}
        open={roleModal.open}
        onCancel={() => setRoleModal({ open: false })}
        onOk={submitRole}
        okButtonProps={{ loading: creatingRole }}
        okText="Save"
      >
        <Form form={roleForm} layout="vertical">
          <Form.Item name="name" label="Role name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="e.g. Regional Manager" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="New Permission"
        open={permModal}
        onCancel={() => setPermModal(false)}
        onOk={submitPerm}
        okButtonProps={{ loading: creatingPerm }}
        okText="Create"
      >
        <Form form={permForm} layout="vertical">
          <Form.Item name="name" label="Permission name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="e.g. report:view" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RolesPermissions;
