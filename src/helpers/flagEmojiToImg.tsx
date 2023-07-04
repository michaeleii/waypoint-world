const flagEmojiToImg = (flag: string) => {
  const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt(0))
    .map((char) => String.fromCharCode(char ? char - 127397 : 0).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

export { flagEmojiToImg };
