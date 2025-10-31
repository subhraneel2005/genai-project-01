"use client";

import ChatInterface from "@/components/ChatInterface";

import React, { useState } from "react";

export default function Waitlist() {
  const [loading, setLoading] = useState(false);
  return <ChatInterface />;
}
