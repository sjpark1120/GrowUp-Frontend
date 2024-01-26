export const processText = (text) => {
  return text.split('\n').map((line, lineIndex) => {
    const parts = line.split(/(<del>.*?<\/del>)/g);
    return (
      <div key={lineIndex}>
        {parts.map((part, partIndex) => {
          if (part.startsWith('<del>') && part.endsWith('</del>')) {
            // <del> 태그가 포함된 부분에는 취소선을 적용
            return <del key={partIndex}>{part.substring(5, part.length - 6)}</del>;
          } else {
            return part;
          }
        })}
      </div>
    );
  });
};
