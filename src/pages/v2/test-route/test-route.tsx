import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { socket } from "src/share/services";

export const TestRoute = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [submitValue, setSubmitValue] = useState<string>("");

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }
  useEffect(() => {
    socket.connect();
    socket.on("chat message", (msg) => {
      setSubmitValue(msg);
    });
    return () => {
      socket.off("chat message", () => {});
      socket.disconnect();
      onDisconnect();
    };
  }, []);

  return (
    <div style={{ width: "100vw", minHeight: "100dvh" }}>
      <h1>message: {submitValue}</h1>
      <Input
        onChange={(value) => {
          socket.emit("chat message", value);
        }}
      />
      <Button
        type='primary'
        onClick={() => {
          if (isConnected) {
            socket.disconnect();
            onDisconnect();
          } else {
            socket.connect();
            onConnect();
          }
        }}
      >
        {isConnected ? "Connected" : "Disconnected"}
      </Button>
    </div>
  );
};
