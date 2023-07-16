interface EllipseProps {
  className?: string;
  width: number;
  height: number;
}

function Ellipse({ className, width, height }: EllipseProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 142 139"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="62" r="62" fill="#0055A6" />
      <circle cx="62" cy="67" r="58" stroke="#5472D3" strokeWidth="4" />
    </svg>
  );
}


export default Ellipse;
