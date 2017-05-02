import { PropTypes } from 'react';


export default function Image({ svgName, svgContents, ...props }) {
  return <svg {...props} dangerouslySetInnerHTML={{ __html: svgContents }} />;
}

Image.propTypes = {
  svgContents: PropTypes.string.isRequired,
  svgName: PropTypes.string.isRequired,
};
