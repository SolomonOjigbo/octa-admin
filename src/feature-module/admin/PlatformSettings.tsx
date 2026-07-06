import React from "react";
import { Button, Tag } from "antd";
import {
  useGetSettingsQuery,
  useToggleSettingMutation,
  useDeleteSettingMutation,
} from "../../core/redux/services/adminPhase2Api";
import CrudPage from "./common/CrudPage";

const asText = (v: any) => {
  if (v === null || v === undefined) return "—";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
};

const PlatformSettings: React.FC = () => {
  const { data = [], isFetching } = useGetSettingsQuery();
  const [toggle] = useToggleSettingMutation();
  const [remove] = useDeleteSettingMutation();

  const enabledOf = (r: any) => r.enabled ?? r.isActive ?? r.isEnabled;

  const columns = [
    { title: "Key", dataIndex: "key", render: asText },
    { title: "Scope", dataIndex: "scope", render: asText },
    { title: "Tenant", dataIndex: "tenantId", ellipsis: true, render: asText },
    { title: "Value", dataIndex: "value", ellipsis: true, render: asText },
    {
      title: "Status",
      key: "status",
      render: (_: any, r: any) => {
        const on = enabledOf(r);
        if (on === undefined) return "—";
        return <Tag color={on ? "green" : "default"}>{on ? "Enabled" : "Disabled"}</Tag>;
      },
    },
  ];

  return (
    <CrudPage
      title="Settings"
      subtitle="Platform and per-tenant configuration"
      rows={data}
      loading={isFetching}
      columns={columns}
      onDelete={(id) => remove(id).unwrap()}
      extraActions={(r) => (
        <Button size="small" type="link" onClick={() => toggle(r.id)}>
          {enabledOf(r) ? "Disable" : "Enable"}
        </Button>
      )}
    />
  );
};

export default PlatformSettings;
