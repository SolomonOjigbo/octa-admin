// src/feature-module/compliance/KycReview.tsx
//
// Superadmin KYC review console: a queue of tenant submissions + a review drawer
// (company profile, document-by-document approve/reject, and approve/reject/
// suspend/reinstate the whole submission). Backed by adminKycApi (/admin/kyc/*).

import React, { useState } from "react";
import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  message,
} from "antd";
import {
  useGetKycQueueQuery,
  useGetKycReviewQuery,
  useStartKycReviewMutation,
  useReviewKycDocumentMutation,
  useApproveKycMutation,
  useRejectKycMutation,
  useSuspendKycMutation,
  useReinstateKycMutation,
} from "../../core/redux/services/adminKycApi";

const txt = (v: any) => (v == null || v === "" ? "—" : String(v));
const dateTime = (v: any) => (v ? new Date(v).toLocaleString() : "—");

const STATUS_COLOR: Record<string, string> = {
  NOT_STARTED: "default",
  DRAFT: "default",
  PENDING_REVIEW: "gold",
  IN_REVIEW: "blue",
  APPROVED: "green",
  REJECTED: "red",
  EXPIRED: "volcano",
  SUSPENDED: "red",
};
const DOC_COLOR: Record<string, string> = { PENDING: "gold", APPROVED: "green", REJECTED: "red" };

const STATUS_OPTIONS = [
  "PENDING_REVIEW",
  "IN_REVIEW",
  "APPROVED",
  "REJECTED",
  "EXPIRED",
  "SUSPENDED",
].map((s) => ({ value: s, label: s.replace(/_/g, " ") }));

type ReasonAction =
  | { kind: "reject" }
  | { kind: "suspend" }
  | { kind: "reject-doc"; documentId: string }
  | null;

const KycReview: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [activeTenant, setActiveTenant] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [reasonAction, setReasonAction] = useState<ReasonAction>(null);

  const { data: queue, isFetching } = useGetKycQueueQuery(statusFilter);
  const { data: review, isFetching: loadingReview } = useGetKycReviewQuery(activeTenant as string, {
    skip: !activeTenant,
  });

  const [startReview] = useStartKycReviewMutation();
  const [reviewDoc] = useReviewKycDocumentMutation();
  const [approveKyc] = useApproveKycMutation();
  const [rejectKyc] = useRejectKycMutation();
  const [suspendKyc] = useSuspendKycMutation();
  const [reinstateKyc] = useReinstateKycMutation();

  const run = async (fn: () => Promise<any>, ok: string) => {
    try {
      await fn();
      message.success(ok);
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Action failed");
    }
  };

  const tenantId = activeTenant as string;

  const submitReason = async () => {
    if (!reasonAction) return;
    if (!reason.trim()) {
      message.warning("Please enter a reason");
      return;
    }
    if (reasonAction.kind === "reject") {
      await run(() => rejectKyc({ tenantId, reason }).unwrap(), "Submission rejected");
    } else if (reasonAction.kind === "suspend") {
      await run(() => suspendKyc({ tenantId, reason }).unwrap(), "Compliance suspended");
    } else if (reasonAction.kind === "reject-doc") {
      await run(
        () =>
          reviewDoc({ tenantId, documentId: reasonAction.documentId, status: "REJECTED", reviewNote: reason }).unwrap(),
        "Document rejected"
      );
    }
    setReason("");
    setReasonAction(null);
  };

  const queueColumns = [
    { title: "Tenant", key: "tenant", render: (_: any, r: any) => txt(r.tenant?.name || r.tenantId) },
    { title: "Type", key: "type", render: (_: any, r: any) => txt(r.tenant?.type) },
    {
      title: "Status",
      dataIndex: "status",
      render: (s: string) => <Tag color={STATUS_COLOR[s] || "default"}>{txt(s).replace(/_/g, " ")}</Tag>,
    },
    { title: "Submitted", dataIndex: "submittedAt", render: dateTime },
    {
      title: "",
      key: "action",
      render: (_: any, r: any) => (
        <Button type="link" onClick={() => setActiveTenant(r.tenantId)}>
          Review
        </Button>
      ),
    },
  ];

  const docColumns = [
    { title: "Document", dataIndex: "type", render: (t: string) => txt(t).replace(/_/g, " ") },
    {
      title: "File",
      key: "file",
      render: (_: any, r: any) => (
        <a href={r.fileUrl} target="_blank" rel="noreferrer">
          {txt(r.fileName)}
        </a>
      ),
    },
    { title: "Expiry", dataIndex: "expiryDate", render: (v: any) => (v ? new Date(v).toLocaleDateString() : "—") },
    {
      title: "Status",
      dataIndex: "status",
      render: (s: string, r: any) => (
        <>
          <Tag color={DOC_COLOR[s] || "default"}>{txt(s)}</Tag>
          {r.reviewNote && s === "REJECTED" ? <span style={{ color: "#cf1322" }}>{r.reviewNote}</span> : null}
        </>
      ),
    },
    {
      title: "",
      key: "docaction",
      render: (_: any, r: any) => (
        <Space>
          <Button
            size="small"
            onClick={() =>
              run(() => reviewDoc({ tenantId, documentId: r.id, status: "APPROVED" }).unwrap(), "Document approved")
            }
          >
            Approve
          </Button>
          <Button
            size="small"
            danger
            onClick={() => {
              setReason("");
              setReasonAction({ kind: "reject-doc", documentId: r.id });
            }}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const st = review?.status;

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="mb-3">
          <h4 className="mb-1">KYC / Compliance Review</h4>
          <p className="text-muted mb-0">Verify tenant business submissions</p>
        </div>
        <Card>
          <Space className="mb-3">
            <Select
              allowClear
              style={{ minWidth: 220 }}
              placeholder="Pending + in review"
              value={statusFilter}
              onChange={(v) => setStatusFilter(v)}
              options={STATUS_OPTIONS}
            />
          </Space>
          <Table
            rowKey={(r: any) => r.tenantId}
            columns={queueColumns}
            dataSource={queue?.items ?? []}
            loading={isFetching}
            size="small"
            pagination={{ pageSize: 20, showTotal: (t) => `${t} submissions` }}
          />
        </Card>

        <Drawer
          width={720}
          open={!!activeTenant}
          onClose={() => setActiveTenant(null)}
          title={review ? `KYC — ${review.tenant?.name || review.tenantId}` : "KYC review"}
          extra={
            review ? <Tag color={STATUS_COLOR[st || ""] || "default"}>{txt(st).replace(/_/g, " ")}</Tag> : null
          }
        >
          {loadingReview && !review && (
            <div style={{ textAlign: "center", padding: 32 }}>
              <Spin />
            </div>
          )}
          {review && (
            <>
              <Space wrap className="mb-3">
                {st === "PENDING_REVIEW" && (
                  <Button onClick={() => run(() => startReview(tenantId).unwrap(), "Marked in review")}>
                    Start review
                  </Button>
                )}
                {(st === "PENDING_REVIEW" || st === "IN_REVIEW") && (
                  <>
                    <Button
                      type="primary"
                      onClick={() => run(() => approveKyc({ tenantId }).unwrap(), "KYC approved")}
                    >
                      Approve
                    </Button>
                    <Button danger onClick={() => { setReason(""); setReasonAction({ kind: "reject" }); }}>
                      Reject
                    </Button>
                  </>
                )}
                {st === "APPROVED" && (
                  <Button danger onClick={() => { setReason(""); setReasonAction({ kind: "suspend" }); }}>
                    Suspend
                  </Button>
                )}
                {st === "SUSPENDED" && (
                  <Button onClick={() => run(() => reinstateKyc(tenantId).unwrap(), "Reinstated")}>Reinstate</Button>
                )}
              </Space>

              {st === "REJECTED" && review.rejectionReason && (
                <div style={{ color: "#cf1322", marginBottom: 12 }}>
                  <strong>Rejection reason:</strong> {review.rejectionReason}
                </div>
              )}

              <Descriptions title="Company profile" bordered column={2} size="small" className="mb-3">
                <Descriptions.Item label="Registered name">{txt(review.registeredName)}</Descriptions.Item>
                <Descriptions.Item label="RC / BN">{txt(review.rcNumber)}</Descriptions.Item>
                <Descriptions.Item label="TIN">{txt(review.tin)}</Descriptions.Item>
                <Descriptions.Item label="Structure">{txt(review.businessStructure)}</Descriptions.Item>
                <Descriptions.Item label="Nature">{txt(review.natureOfBusiness)}</Descriptions.Item>
                <Descriptions.Item label="Phone">{txt(review.contactPhone)}</Descriptions.Item>
                <Descriptions.Item label="Email">{txt(review.contactEmail)}</Descriptions.Item>
                <Descriptions.Item label="Website">{txt(review.website)}</Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                  {txt([review.addrLine1, review.addrCity, review.addrState].filter(Boolean).join(", "))}
                </Descriptions.Item>
              </Descriptions>

              <h6>Documents</h6>
              <Table
                rowKey="id"
                columns={docColumns}
                dataSource={review.documents ?? []}
                size="small"
                pagination={false}
              />
            </>
          )}
        </Drawer>

        <Modal
          open={!!reasonAction}
          title={reasonAction?.kind === "suspend" ? "Suspend compliance" : "Reason for rejection"}
          onOk={submitReason}
          onCancel={() => { setReasonAction(null); setReason(""); }}
          okText="Confirm"
          okButtonProps={{ danger: true }}
        >
          <Input.TextArea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain the reason (shown to the tenant)…"
          />
        </Modal>
      </div>
    </div>
  );
};

export default KycReview;
