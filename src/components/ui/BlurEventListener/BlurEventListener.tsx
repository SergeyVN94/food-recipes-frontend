import React, { useCallback, useEffect, useRef } from 'react';
import _ from 'lodash';

export type BlurEventListenerProps = {
  onBlur: () => void;
  children?: React.ReactNode;
};

const BlurEventListener: React.FC<BlurEventListenerProps> = ({
  children,
  onBlur,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const firstChild = _.castArray(children)[0];

  const handleDocumentClick = useCallback((ev: MouseEvent) => {
    if (!rootRef.current || !(ev.target instanceof Node)) return;
    if (!rootRef.current.contains(ev.target)) onBlur();
  }, [onBlur, rootRef.current]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [handleDocumentClick]);

  if (!React.isValidElement(firstChild)) return null;

  return (
    React.cloneElement(
      firstChild,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { ref: rootRef },
    )
  );
};

export default BlurEventListener;
