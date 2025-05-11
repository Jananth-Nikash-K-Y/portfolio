import { PerspectiveCamera, Scene, Vector3, Group } from "three";
import { useEffect, useRef } from "react";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import SectionTitle from "./shared/SectionTitle";

const skills = [
  { name: "Angular", slug: "angular" },
  { name: "Apache ECharts", slug: "apacheecharts" },
  { name: "Apache Kafka", slug: "apachekafka" },
  { name: "Dart", slug: "dart" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Firebase", slug: "firebase" },
  { name: "Flask", slug: "flask" },
  { name: "Flutter", slug: "flutter" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "JavaScript", slug: "javascript" },
  { name: "JSON", slug: "json" },
  { name: "Kafka", slug: "apachekafka" },
  { name: "Meta", slug: "meta" },
  { name: "ML Flow", slug: "mlflow" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "MySQL", slug: "mysql" },
  { name: "Netlify", slug: "netlify" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "npm", slug: "npm" },
  { name: "Numpy", slug: "numpy" },
  { name: "Obsidian", slug: "obsidian" },
  { name: "Open API", slug: "openai" },
  { name: "Pandas", slug: "pandas" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Prettier", slug: "prettier" },
  { name: "Python", slug: "python" },
  { name: "React", slug: "react" },
  { name: "Replicator", slug: "nvidia" },
  { name: "scikit-learn", slug: "scikitlearn" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "Three.js", slug: "threedotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Vercel", slug: "vercel" },
  { name: "Vite", slug: "vite" },
  { name: "Wordpress", slug: "wordpress" },
  { name: "YOLO", slug: "yolo" },
];

const SkillSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<Group>();
  const controlsRef = useRef<TrackballControls>();
  const requestRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current!;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const camera = new PerspectiveCamera(35, width / height, 0.1, 3500);
    camera.position.z = 2000;

    const scene = new Scene();
    const renderer = new CSS2DRenderer();
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const group = new Group();
    groupRef.current = group;
    scene.add(group);

    const vector = new Vector3();
    const objects: CSS2DObject[] = [];

    skills.forEach((skill, i) => {
      const wrapper = document.createElement("div");
      wrapper.className = "iconWrapper";

      const img = document.createElement("img");
      img.src = `https://unpkg.com/simple-icons@9.1.0/icons/${skill.slug}.svg`;
      img.alt = skill.name;
      img.style.width = "40px";
      img.style.filter =
        "invert(64%) sepia(6%) saturate(1740%) hue-rotate(185deg) brightness(87%) contrast(83%)";
      img.draggable = false;

      const label = document.createElement("p");
      label.textContent = skill.name;
      label.className = "label";

      wrapper.appendChild(img);
      wrapper.appendChild(label);

      const obj = new CSS2DObject(wrapper);
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      obj.position.setFromSphericalCoords(630, phi, theta);
      vector.copy(obj.position).multiplyScalar(2);

      objects.forEach((obj) => {
        const scale = 1 - obj.position.z / 1000;
        obj.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        obj.element.style.opacity = `${scale}`;
      });
      group.add(obj);
    });

    const controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2;
    controls.noPan = true;
    controls.noZoom = true;
    controlsRef.current = controls;

    let hasInteraction = false;
    let interactionTimer: NodeJS.Timeout;

    renderer.domElement.addEventListener("pointerdown", () => {
      hasInteraction = true;
      clearTimeout(interactionTimer);
    });
    renderer.domElement.addEventListener("pointerup", () => {
      interactionTimer = setTimeout(() => (hasInteraction = false), 2000);
    });

    const animate = () => {
      if (group) {
        group.rotation.y += hasInteraction ? 0.001 : 0.004;
        group.rotation.x += hasInteraction ? 0.001 : 0.004;
      }
      controls.update();
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      controls.handleResize();
    };

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(requestRef.current!);
      window.removeEventListener("resize", resize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="skills" className="py-10 text-white text-center">
      <SectionTitle>Skills & Expertise</SectionTitle>
      <div
        ref={containerRef}
        style={{ marginTop: '4.5rem' }}
        className="mx-auto w-[90vw] h-[90vw] min-w-[220px] min-h-[220px] sm:w-[70vmin] sm:h-[70vmin] md:w-[60vmin] md:h-[60vmin] lg:w-[576px] lg:h-[576px] max-w-full max-h-[576px] relative"
      ></div>
    </section>
  );
};

export default SkillSphere;