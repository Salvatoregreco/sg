# Documentazione del Componente `DataTable`

## 1. Descrizione Generale

`DataTable` è un componente React che permette di visualizzare e gestire tabelle di dati con funzionalità avanzate come filtraggio, ordinamento e paginazione.

## 2. Props

| Proprietà     | Tipo       | Descrizione                                                        | Valore di Default       |
|---------------|------------|--------------------------------------------------------------------|-------------------------|
| `data`        | `object`   | I dati da visualizzare nella tabella.                              | `{}`                    |
| `filters`     | `object`   | Filtri applicabili per la ricerca o la selezione dei dati.         | `{}`                    |
| `columns`     | `array`    | L'elenco delle colonne da visualizzare nella tabella.              | `[]`                    |
| `formAction`  | `string`   | URL o azione per il form di interazione con i dati.                | `undefined`             |

## 3. Esempio di Utilizzo

```javascript
import DataTable from './DataTable';

const App = () => {
    const data = [
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Smith', age: 34 }
    ];

    const columns = [
        { label: 'ID', key: 'id' },
        { label: 'Name', key: 'name' },
        { label: 'Age', key: 'age' }
    ];

    const filters = {
        search: 'name',
        sort: 'name',
        sortDir: 'asc'
    }

    return (
        <DataTable
            data={data}
            columns={columns}
            filters={filters}
            formAction="/submit-data"
        />
    );
};

export default App;
```
