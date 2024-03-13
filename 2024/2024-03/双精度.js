function getBinaryRepresentation(number) {
  const buffer = new ArrayBuffer(8); // 创建一个包含8字节的   ArrayBuffer
  const view = new DataView(buffer); // 创建一个DataView以便访问内存中的数据
  view.setFloat64(0, number); // 将浮点数写入到内存中

  // 读取内存中的字节，并将其转换为二进制字符串
  const binaryString = Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(2).padStart(8, '0'))
    .join('');

  // 将二进制字符串分割为符号位、指数位和尾数位
  const signBit = binaryString[0];
  const exponentBits = binaryString.substring(1, 12);
  const mantissaBits = binaryString.substring(12, 64);

  return { signBit, exponentBits, mantissaBits };
}

const number = 8.8125; // 要展示的数字
const { signBit, exponentBits, mantissaBits } = 	getBinaryRepresentation(number);

console.log(`符号位: ${signBit}`);
console.log(`指数位: ${exponentBits}`);
console.log(`尾数位: ${mantissaBits}`);

// 符号位: 0
// 指数位: 10000000010
// 尾数位: 0001101000000000000000000000000000000000000000000000