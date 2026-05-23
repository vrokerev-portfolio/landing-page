# Cambios aplicados

- Eliminada la sección `TeachingSection` del render principal y del código fuente.
- Renumeradas las secciones: Projects = 03, Skills = 04, Certificates = 05, Contact = 06.
- Reordenados los colores activos:
  - Hero/About: celeste
  - 02 Experience: verde agua
  - 03 Projects: morado
  - 04 Skills: rojo rosado
  - 05 Certificates: rojo
  - 06 Contact: amarillo
- El número grande de cada sección ahora cambia de color suavemente usando el color activo de la sección.
- Optimizada la navegación con Lenis: se mantiene en desktop, pero se desactiva en mobile/reduced-motion para evitar lag al hacer scroll.
- Optimizado el canvas del Hero:
  - Menos nodos en mobile.
  - FPS limitado.
  - DPR limitado.
  - Pausa cuando sale del viewport.
  - Sin gradientes por conexión en cada frame.
- Optimizado el canvas de Skills:
  - FPS limitado.
  - DPR limitado.
  - Menos ruido visual por frame.
  - Menos sombras en mobile.
  - Pausa cuando sale del viewport.
- Mejorado el componente Projects estilo VS Code:
  - Los `.md` ahora están más indentados hacia la derecha para marcar mejor la jerarquía.
  - La barra de pestañas y sus scrollbars se adaptan al estilo visual oscuro/neón de la página.
  - También se estilizó el scrollbar del panel de contenido.

Nota: intenté ejecutar el build, pero `npm ci` no terminó correctamente dentro del sandbox porque algunos paquetes quedaron vacíos/incompletos. Los cambios se hicieron directamente sobre el código fuente y el ZIP no incluye `node_modules`.
