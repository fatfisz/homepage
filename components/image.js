import PropTypes from 'prop-types';

export function Image({ svgName, svgContents, ...props }) {
  return <svg {...props}>{svgContents}</svg>;
}

Image.propTypes = {
  svgContents: PropTypes.node.isRequired,
  svgName: PropTypes.string.isRequired,
};
