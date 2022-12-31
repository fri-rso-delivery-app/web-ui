import { SvgIcon, SxProps } from "@mui/material";
import { forwardRef } from "react";

export type FontAwesomeSvgIconProps = {
  icon: any;
  sx?: SxProps;
  fontSize?: "small" | "inherit" | "large" | "medium" | undefined;
};
const FontAwesomeSvgIcon = forwardRef<SVGSVGElement, FontAwesomeSvgIconProps>(
  (props, ref) => {
    const { icon, sx, fontSize } = props;

    const {
      icon: [width, height, , , svgPathData],
    } = icon;

    return (
      <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`} sx={sx} fontSize={fontSize}>
        {typeof svgPathData === 'string' ? (
          <path d={svgPathData} />
        ) : (
          /**
           * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
           * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
           * of a duotone icon. 40% is the default opacity.
           *
           * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
           */
          svgPathData.map((d: string, i: number) => (
            <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
          ))
        )}
      </SvgIcon>
    );
  },
);

export default FontAwesomeSvgIcon;
