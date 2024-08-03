const net = require("net");
const fs = require("fs");

const SERVER_HOST = "127.0.0.1";
const SERVER_PORT = 3000;
const OUTPUT_FILE_NAME = "stock_data.json";

const readInt32BE = (buffer, offset) => buffer.readInt32BE(offset);

const socket = new net.Socket();
let packets = [];
let nextSeq = 1;

socket.connect(SERVER_PORT, SERVER_HOST, () => {
  console.log("Connected to server");
  const payload = Buffer.alloc(2);
  payload.writeUInt8(1, 0);
  payload.writeUInt8(0, 1);
  socket.write(payload);
});

socket.on("data", (buffer) => {
  for (let i = 0; i < buffer.length; i += 17) {
    const packet = {
      symbol: buffer.toString("ascii", i, i + 4),
      action: buffer.toString("ascii", i + 4, i + 5),
      quantity: readInt32BE(buffer, i + 5),
      price: readInt32BE(buffer, i + 9),
      sequence: readInt32BE(buffer, i + 13),
    };

    packets.push(packet);

    while (nextSeq < packet.sequence) {
      requestPacket(nextSeq);
      nextSeq++;
    }

    nextSeq = packet.sequence + 1;
  }
});

const requestPacket = (seq) => {
  const payload = Buffer.alloc(2);
  payload.writeUInt8(2, 0);
  payload.writeUInt8(seq, 1);
  socket.write(payload);
};

socket.on("close", () => {
  console.log("Connection closed");
  fs.writeFileSync(OUTPUT_FILE_NAME, JSON.stringify(packets, null, 2));
  console.log(`Data saved to ${OUTPUT_FILE_NAME}`);
});

socket.on("error", (err) => {
  console.error("Error:", err);
});
