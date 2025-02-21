/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSettings } from '../context/SettingsContext';
import { SettingsModalToggle } from './SettingsModalToggle';

interface ISettingsModalProps {
  show: boolean;
  onModalClose: () => void;
}

export const SettingsModal: React.FC<ISettingsModalProps> = ({
  show,
  onModalClose,
}) => {
  const { settings, setSettings } = useSettings();
  const [hideMinorTracks, setHideMinorTracks] = useState(
    settings.hideMinorTracks
  );
  const [hidePromoTracks, setHidePromoTracks] = useState(
    settings.hidePromoTracks
  );
  const [jsonOptimizedTrackIdCopy, setJsonOptimizedTrackIdCopy] = useState(
    settings.jsonOptimizedTrackIdCopy
  );

  const onModalSave = () => {
    setSettings({
      hideMinorTracks,
      hidePromoTracks,
      jsonOptimizedTrackIdCopy,
    });
    onModalClose();
  };

  const onModalShow = () => {
    setHideMinorTracks(settings.hideMinorTracks);
    setHideMinorTracks(settings.hidePromoTracks);
    setJsonOptimizedTrackIdCopy(settings.jsonOptimizedTrackIdCopy);
  };

  return (
    <Modal show={show} onShow={onModalShow} onHide={onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <>
            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <SettingsModalToggle
                id="minorTrack"
                label="Hide Minor Tracks"
                checked={hideMinorTracks}
                tooltip="Minor tracks feature segments of another song"
                onChange={() => {
                  setHideMinorTracks((prev) => !prev);
                }}
              />
                <SettingsModalToggle
                id="promoTrack"
                label="Hide Third Party Tracks"
                checked={hidePromoTracks}
                tooltip="Tracks from outside the game itself, such as trailers"
                onChange={() => {
                  setHidePromoTracks((prev) => !prev);
                }}
              />
              <SettingsModalToggle
                id="jsonOptimizedTrackIdCopy"
                label="JSON Optimized Track ID Copy"
                checked={jsonOptimizedTrackIdCopy}
                tooltip="Wrap track ID in JSON compatible syntax"
                onChange={() => {
                  setJsonOptimizedTrackIdCopy((prev) => !prev);
                }}
              />
            </div>
          </>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onModalSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
