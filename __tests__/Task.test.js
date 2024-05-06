// Importa la clase Task desde Task.js
import { Task } from '../js/Task.js';

// Prueba para el constructor de Task
test('Constructor de Task crea una tarea con los valores correctos', () => {
  const task = new Task('Tarea de prueba');
  expect(task.name).toBe('Tarea de prueba');
  expect(task.complete).toBe(false);
  expect(task.id).toBeDefined(); // Asegura que se haya asignado un ID
  expect(task.tags).toEqual([]); // Asegura que las etiquetas se inicialicen como un array vacío
});

// Prueba para addTag() en Task
test('addTag agrega una etiqueta correctamente', () => {
  const task = new Task('Tarea de prueba');
  task.addTag('tag1');
  expect(task.tags).toContain('tag1');
});

// Prueba para asegurar que addTag no agrega etiquetas duplicadas
test('addTag no agrega etiquetas duplicadas', () => {
  const task = new Task('Tarea de prueba');
  task.addTag('tag1');
  task.addTag('tag1'); // Intentamos agregar la misma etiqueta nuevamente
  expect(task.tags.length).toBe(1); // Debería seguir siendo solo 1
});

// Prueba para asegurar que addTag no agrega más de 5 etiquetas por tarea
test('addTag no agrega más de 5 etiquetas por tarea', () => {
  const task = new Task('Tarea de prueba');
  task.addTag('tag1');
  task.addTag('tag2');
  task.addTag('tag3');
  task.addTag('tag4');
  task.addTag('tag5');
  task.addTag('tag6'); // Intentamos agregar una sexta etiqueta
  expect(task.tags.length).toBe(5); // Debería seguir siendo solo 5
});
