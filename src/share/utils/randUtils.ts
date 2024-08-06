export const randAvaBg = () => {
  const result = Math.floor(Math.random() * 3);
  switch (result) {
    case 0:
      return "#f56a00";
    case 1:
      return "#87d068";
    case 2:
      return "#1677ff";
  }
};
