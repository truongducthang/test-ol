import 'ol/ol.css';

const center = fromLonLat([2.364, 48.82]);

import React from 'react';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import 'ol/ol.css';

import {
  RMap,
  ROSM,
  RLayerVector,
  RStyle,
  RFeature,
  ROverlay,
  RInteraction,
} from 'rlayers';
import {
  altShiftKeysOnly,
  platformModifierKeyOnly,
  shiftKeyOnly,
  altKeyOnly,
  never,
  doubleClick,
} from 'ol/events/condition';

export const coords: Record<string, Coordinate> = {
  'Arc de Triomphe': [2.295, 48.8737],
  "Place d'Italie": [2.355, 48.831],
  Bastille: [2.369, 48.853],
  'Tour Eiffel': [2.294, 48.858],
  Montmartre: [2.342, 48.887],
};

let unique_id = 0;

const TourEiffel = fromLonLat([2.294, 48.858]);
const TourEiffelPoint = new Point(TourEiffel);

export default function Simple(): JSX.Element {
  // The features must be part of the state as they will be modified
  const [features, setFeatures] = React.useState(() =>
    Object.keys(coords).map(
      (f) =>
        new Feature({
          geometry: new Point(fromLonLat(coords[f])),
          name: f,
          uid: unique_id++,
        })
    )
  );
  const vectorRef = React.useRef() as React.RefObject<RLayerVector>;

  const [selected, setSelected] = React.useState(false);

  return (
    <div>
      <RMap
        width={'100%'}
        height={'60vh'}
        initial={{ center: center, zoom: 11 }}
        onClick={(e) => {
          const coords = e.map.getCoordinateFromPixel(e.pixel);
          features.push(
            new Feature({ geometry: new Point(coords), uid: unique_id++ })
          );
          // Why not setFeatures(features) ?
          // Because it won't have any effect -
          // unless you artificially create a new array
          // React won't know that something changed
          setFeatures([...features]);
        }}
      >
        <ROSM />

        <RLayerVector>
          {/* <RStyle.RStyle>
           ICON
          </RStyle.RStyle> */}
          <RFeature geometry={TourEiffelPoint} />
        </RLayerVector>

        <RLayerVector
          onChange={React.useCallback((e) => {
            // On every change, check if there is a feature covering the Eiffel Tower
            const source = e.target as VectorSource<OLFeatureClass>;
            if (source?.forEachFeatureAtCoordinateDirect)
              setSelected(
                source.forEachFeatureAtCoordinateDirect(TourEiffel, () => true)
              );
          }, [])}
        >
          {/* This is the style used for the drawn polygons */}
          <RStyle.RStyle>
            <RStyle.RStroke color="#0000ff" width={3} />
            <RStyle.RFill color="rgba(0, 0, 0, 0.75)" />
          </RStyle.RStyle>

          <RInteraction.RDraw
            type={'Polygon'}
            condition={shiftKeyOnly}
            freehandCondition={altShiftKeysOnly}
          />

          <RInteraction.RDraw
            type={'Circle'}
            condition={altKeyOnly}
            freehandCondition={never}
          />

          <RInteraction.RModify
            condition={platformModifierKeyOnly}
            deleteCondition={React.useCallback(
              (e) => platformModifierKeyOnly(e) && doubleClick(e),
              []
            )}
          />
        </RLayerVector>
      </RMap>

      <div>
        <p className="p-0 m-0">
          Hold <em>Shift</em> and click without dragging for a regular polygon
        </p>
        <p className="p-0 m-0">
          Hold <em>Shift</em> and <em>Alt</em> and drag for a freehand polygon
        </p>
        <p className="p-0 m-0">
          Hold <em>Alt</em> and click without dragging for a circle
        </p>
        <p className="p-0 m-0">
          Hold <em>Ctrl / &#x2318;</em> and drag to move/add a vertex
        </p>
        <p className="p-0 m-0">
          Hold <em>Ctrl / &#x2318;</em> and double click to remove a vertex
        </p>
      </div>
      <div className="mx-0 mt-1 mb-3 p-1 w-100 jumbotron shadow shadow">
        <p>Currently the Eiffel Tower is{selected ? '' : ' not'} covered</p>
      </div>
    </div>
  );
}
