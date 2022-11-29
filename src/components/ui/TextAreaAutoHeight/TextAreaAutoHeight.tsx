import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

const updateHeight = (ev: React.ChangeEvent<HTMLTextAreaElement>, maxRows?: number) => {
  const textarea = ev.target;

  textarea.style.height = 'auto';
  const offset = textarea.offsetHeight - textarea.clientHeight;
  let nextHeight = textarea.scrollHeight + offset;

  if (_.isNumber(maxRows)) {
    const rowHeight = _.parseInt(window.getComputedStyle(textarea).lineHeight);
    const maxHeight = maxRows * rowHeight;

    if (nextHeight > maxHeight) nextHeight = maxHeight;
  }

  textarea.style.height = `${nextHeight}px`;
};

const TextAreaAutoHeight: React.FC<{
  children: JSX.Element;
  maxRows?: number;
}> = observer(({ children, maxRows }) => {
  const child = React.Children.only(children);
  if (!child) return null;

  const onChange = useCallback((ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateHeight(ev, maxRows);
    if (child.props.onChange) child.props.onChange(ev);
  }, [child.props.onChange, maxRows]);

  return React.cloneElement(child, {
    ...child.props,
    onChange,
    style: { ...child.props.style, resize: 'none' },
  });
});

export default TextAreaAutoHeight;
