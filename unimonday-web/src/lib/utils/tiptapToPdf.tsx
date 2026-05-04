import React from 'react';
import { Text, View, StyleSheet, Svg, Path, G } from '@react-pdf/renderer';

// Define strict types for TipTap JSON structure
export interface TipTapNode {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs?: Record<string, any>;
  content?: TipTapNode[];
  text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marks?: { type: string; attrs?: Record<string, any> }[];
}

// Map TipTap marks (bold, italic, underline, etc.) to React-PDF styles
const extractStylesFromMarks = (marks?: TipTapNode['marks']) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const style: any = {};
  if (!marks) return style;

  marks.forEach((mark) => {
    switch (mark.type) {
      case 'bold':
        style.fontWeight = 'bold';
        break;
      case 'italic':
        style.fontStyle = 'italic';
        break;
      case 'underline':
        style.textDecoration = 'underline';
        break;
      // Add more marks as needed
    }
  });

  return style;
};

// Map TipTap alignment attributes to React-PDF styles
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractAlignment = (attrs?: Record<string, any>) => {
  if (!attrs || !attrs.textAlign) return {};
  return { textAlign: attrs.textAlign };
};

// Strict layout mapping: Map layout options to points (pt)
// 1 inch = 72 points
// React PDF uses `pt` exactly like CSS `px` implicitly in its styling.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractLayoutOpts = (attrs?: Record<string, any>) => {
   if (!attrs) return {};
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const layoutStyle: any = {};

   if (attrs.lineHeight) {
       // if we have 1.5, we apply it.
       layoutStyle.lineHeight = attrs.lineHeight;
   }

   if (attrs.margin) {
       // Assuming margin comes in inches for academic formats like APA
       layoutStyle.marginTop = attrs.margin.top ? attrs.margin.top * 72 : undefined;
       layoutStyle.marginBottom = attrs.margin.bottom ? attrs.margin.bottom * 72 : undefined;
       layoutStyle.marginLeft = attrs.margin.left ? attrs.margin.left * 72 : undefined;
       layoutStyle.marginRight = attrs.margin.right ? attrs.margin.right * 72 : undefined;
   }

   return layoutStyle;
};

// Base styles for the PDF
const styles = StyleSheet.create({
  paragraph: {
    fontSize: 12, // 12pt standard for academic
    marginBottom: 12, // 12pt
    lineHeight: 1.5,
    fontFamily: 'Helvetica', // Defaulting to Helvetica for strict fidelity. We can inject custom fonts later.
  },
  heading1: {
    fontSize: 24, // 24pt
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 12,
  },
  heading2: {
    fontSize: 20, // 20pt
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  heading3: {
    fontSize: 16, // 16pt
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  table: {
    display: 'flex',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 5, // 5pt
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
});

// The core parser function (recursive)
export const parseTipTapNodeToPdf = (node: TipTapNode, index: number = 0): React.ReactNode => {
  if (node.type === 'text') {
    const textStyles = extractStylesFromMarks(node.marks);
    return (
      <Text key={index} style={textStyles}>
        {node.text}
      </Text>
    );
  }

  // Handle nested content
  const renderChildren = () =>
    node.content?.map((childNode, i) => parseTipTapNodeToPdf(childNode, i));

  const alignmentStyle = extractAlignment(node.attrs);
  const layoutStyle = extractLayoutOpts(node.attrs);

  switch (node.type) {
    case 'doc':
      return <View key={index} style={layoutStyle}>{renderChildren()}</View>;

    case 'paragraph':
      return (
        <Text key={index} style={[styles.paragraph, alignmentStyle, layoutStyle]}>
          {renderChildren()}
        </Text>
      );

    case 'heading':
      const level = node.attrs?.level || 1;
      let headingStyle = styles.heading1;
      if (level === 2) headingStyle = styles.heading2;
      if (level === 3) headingStyle = styles.heading3;

      return (
        <Text key={index} style={[headingStyle, alignmentStyle, layoutStyle]}>
          {renderChildren()}
        </Text>
      );

    case 'table':
      return (
        <View key={index} style={[styles.table, layoutStyle]}>
          {renderChildren()}
        </View>
      );

    case 'tableRow':
      return (
        <View key={index} style={styles.tableRow}>
          {renderChildren()}
        </View>
      );

    case 'tableHeader':
      return (
        <View key={index} style={styles.tableHeaderCell}>
          {renderChildren()}
        </View>
      );

    case 'tableCell':
      return (
        <View key={index} style={styles.tableCell}>
          {renderChildren()}
        </View>
      );

    case 'bulletList':
    case 'orderedList':
      return (
        <View key={index} style={{ marginLeft: 15, marginBottom: 10 }}>
          {renderChildren()}
        </View>
      );

    case 'listItem':
      return (
        <View key={index} style={{ flexDirection: 'row', marginBottom: 2 }}>
          <Text style={{ marginRight: 5 }}>•</Text>
          <Text style={{ flex: 1 }}>{renderChildren()}</Text>
        </View>
      );

    case 'math':
    case 'equation':
        // Handling Math/Equations as SVG
        // Note: For a real app, you'd use KaTeX's renderToHTML, then parse SVG strings into React-PDF <Svg> nodes.
        // This is a placeholder to show the Architecture intent of rendering SVGs instead of blurry PNGs.
        return (
            <View key={index} style={{ marginBottom: 10, marginTop: 10, alignSelf: 'center' }}>
                <Svg width="100" height="30" viewBox="0 0 100 30">
                     <G fill="#000">
                         {/* Placeholder Path representing equation: E=mc^2 */}
                         <Path d="M10,20 L20,10 L30,20 Z" />
                     </G>
                </Svg>
            </View>
        );

    default:
      // Fallback for unknown nodes, just render their content or ignore
      console.warn(`Unsupported TipTap node type in PDF Parser: ${node.type}`);
      return node.content ? <View key={index}>{renderChildren()}</View> : null;
  }
};
