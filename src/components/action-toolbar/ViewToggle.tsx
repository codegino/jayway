import React, {FC} from 'react';
import {ReactComponent as ListIcon} from '../../icons/list.svg';
import {ReactComponent as ThumbnailIcon} from '../../icons/thumbnail.svg';
import {useActionState} from '../../state/action-state';

export const ViewToggle: FC<{className: string}> = props => {
  const {view, dispatch} = useActionState();

  const handleChangeView = () => {
    dispatch({
      type: 'view',
      payload: view === 'thumbnail' ? 'list' : 'thumbnail',
    });
  };

  const Icon = view === 'thumbnail' ? ThumbnailIcon : ListIcon;

  return (
    <div
      {...props}
      onClick={handleChangeView}
      onKeyPress={handleChangeView}
      tabIndex={0}
      role="button"
      aria-label={view === 'thumbnail' ? 'Grid View' : 'List View'}
      title={view === 'thumbnail' ? 'Grid View' : 'List View'}
    >
      <Icon
        style={{
          animation: 'spin 0.2s linear',
        }}
        viewBox="0 0 24 23"
      />
    </div>
  );
};
