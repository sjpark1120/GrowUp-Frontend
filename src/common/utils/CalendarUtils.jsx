export const processText = (text) => {
    return text.split('\n').map((line, lineIndex) => (
      <div key={lineIndex}>
        {line.startsWith('<del>') && line.endsWith('</del>') ? (
          <del>{line.substring(5, line.length - 6)}</del>
        ) : (
          line
        )}
      </div>
    ));
  };