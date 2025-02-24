<script setup lang="ts">
import { reactive } from "vue";
import { type UserInfo, getMine } from "@/api/user";
import { deviceDetection } from "@pureadmin/utils";

defineOptions({
  name: "Profile"
});

const userInfos = reactive({
  avatar: "",
  nickname: "",
  email: "",
  phone: "",
  description: "",
  // KYC认证信息
  kycStatus: "已认证",
  kycLevel: "机构投资者",
  kycTime: "2024-03-20",
  kycOrg: "中国碳交易认证中心",
  kycId: "CARBON-ORG-2024-001",
  orgName: "某某投资有限公司",
  orgLicense: "91310000XXXXXXXX8B",
  orgAddress: "上海市浦东新区陆家嘴环路1000号",
  orgType: "私募基金管理人",
  orgScale: "大型机构"
});

getMine().then(res => {
  Object.assign(userInfos, res.data);
});
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">账户信息</h3>
    <el-form label-position="top">
      <el-form-item label="头像">
        <el-avatar :size="80" :src="userInfos.avatar" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-text>{{ userInfos.nickname || "暂无" }}</el-text>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-text>{{ userInfos.email || "暂无" }}</el-text>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-text>{{ userInfos.phone || "暂无" }}</el-text>
      </el-form-item>
      <el-form-item label="简介">
        <el-text>{{ userInfos.description || "暂无" }}</el-text>
      </el-form-item>

      <el-divider content-position="left">KYC认证信息</el-divider>

      <el-form-item label="认证状态">
        <el-tag type="success" effect="dark">{{ userInfos.kycStatus }}</el-tag>
      </el-form-item>
      <el-form-item label="认证等级">
        <el-text>{{ userInfos.kycLevel }}</el-text>
      </el-form-item>
      <el-form-item label="认证时间">
        <el-text>{{ userInfos.kycTime }}</el-text>
      </el-form-item>
      <el-form-item label="认证机构">
        <el-text>{{ userInfos.kycOrg }}</el-text>
      </el-form-item>
      <el-form-item label="认证编号">
        <el-text>{{ userInfos.kycId }}</el-text>
      </el-form-item>

      <el-divider content-position="left">机构信息</el-divider>

      <el-form-item label="机构名称">
        <el-text>{{ userInfos.orgName }}</el-text>
      </el-form-item>
      <el-form-item label="统一社会信用代码">
        <el-text>{{ userInfos.orgLicense }}</el-text>
      </el-form-item>
      <el-form-item label="注册地址">
        <el-text>{{ userInfos.orgAddress }}</el-text>
      </el-form-item>
      <el-form-item label="机构类型">
        <el-text>{{ userInfos.orgType }}</el-text>
      </el-form-item>
      <el-form-item label="机构规模">
        <el-text>{{ userInfos.orgScale }}</el-text>
      </el-form-item>
    </el-form>
  </div>
</template>
