import { createClient } from '@libsql/client';
import { baseObject } from './useMateriasStore';

const url = import.meta.env.VITE_TURSO_DB_URL
const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN

export const client = createClient({ url, authToken })

export async function saveMaterias (json) {
  if (typeof json !== 'string') {
    throw new Error('materias json debe ser de tipo texto')
  }

  await client.execute('DELETE FROM horarios WHERE id = 1')
  await client.execute({
    sql: 'INSERT INTO horarios(id, materias) VALUES(1, ?)',
    args: [json]
  })
}

export async function getMaterias () {
  const { rows } = await client.execute('SELECT * FROM horarios WHERE id = 1')
  const horarios = (rows[0].materias) ? JSON.parse(rows[0].materias) : baseObject
  return horarios
}

