import * as THREE from 'three';
import { fadeDistance, opacity, gridSize, themeColor, themeColorOrange } from '../app_config.js'

export function create_grid(scene) {

    let gridGroup;
    
    if (gridGroup) {
        scene.remove(gridGroup);
    }

    gridGroup = new THREE.Group();

    const gridExtent = parseFloat(fadeDistance);
    const spacing = parseFloat(gridSize);
    const baseOpacity = parseFloat(opacity);

    const getFadeOpacity = (x, z) => {
        const distanceFromCenter = Math.sqrt(x * x + z * z);
        const fadeFactor = 1 - (distanceFromCenter / gridExtent);
        return baseOpacity * Math.max(fadeFactor, 0);
    };

    // Vertical lines (parallel to Z-axis)
    for (let x = -gridExtent; x <= gridExtent; x += spacing) {
        for (let z = -gridExtent; z < gridExtent; z += spacing) {
            const midZ = z + spacing / 2;
            const opacity = getFadeOpacity(x, midZ);
            const geometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(x, 0, z),
                new THREE.Vector3(x, 0, z + spacing)
            ]);
            const material = new THREE.LineBasicMaterial({
                color: themeColor,
                transparent: true,
                opacity: opacity
            });
            gridGroup.add(new THREE.Line(geometry, material));
        }
    }

    // Horizontal lines (parallel to X-axis)
    for (let z = -gridExtent; z <= gridExtent; z += spacing) {
        for (let x = -gridExtent; x < gridExtent; x += spacing) {
            const midX = x + spacing / 2;
            const opacity = getFadeOpacity(midX, z);
            const geometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(x, 0, z),
                new THREE.Vector3(x + spacing, 0, z)
            ]);
            const material = new THREE.LineBasicMaterial({
                color: themeColor,
                transparent: true,
                opacity: opacity
            });
            gridGroup.add(new THREE.Line(geometry, material));
        }
    }

    // Axis lines
    const axisOpacity = Math.min(1, baseOpacity * 1.5);

    const xAxis = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-gridExtent, 0, 0),
            new THREE.Vector3(gridExtent, 0, 0)
        ]),
        new THREE.LineBasicMaterial({
            color: themeColorOrange,
            transparent: false,
            opacity: axisOpacity
        })
    );
    gridGroup.add(xAxis);

    const zAxis = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, -gridExtent),
            new THREE.Vector3(0, 0, gridExtent)
        ]),
        new THREE.LineBasicMaterial({
            color: themeColorOrange,
            transparent: false,
            opacity: axisOpacity
        })
    );
    gridGroup.add(zAxis);

    scene.add(gridGroup);
};
