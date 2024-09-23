import React, { useState, useEffect, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/16/solid';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import { BeatLoader } from 'react-spinners';

const DataTable = ({ data = {}, filters = {}, columns = [], formAction }) => {
    const SORT_ASC = 'asc';
    const SORT_DESC = 'desc';
    const MIN_LOADING_TIME = 500;
    const COMPONENT = 'DataTable';
    const {
        DataTable: { perPageOptions, perPageDefault, searchByDefault, searchByOptions },
    } = usePage().props;

    const [search, setSearch] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || perPageDefault);
    const [page, setPage] = useState(Number(filters?.page) || 1);
    const [search_by, setSearchBy] = useState(filters?.search_by || searchByDefault);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = React.useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const dataTableRequest = (url, params = {}, options = {}) => {
        const startTime = Date.now();
        setIsLoading(true);
        router.get(url, params, {
            headers: {
                'X-Inertia-Partial-Component': COMPONENT,
            },
            replace: true,
            preserveState: true,
            onFinish: () => {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = MIN_LOADING_TIME - elapsedTime;

                if (remainingTime > 0) {
                    setTimeout(() => {
                        if (isMounted.current) {
                            setIsLoading(false);
                        }
                    }, remainingTime);
                } else {
                    if (isMounted.current) {
                        setIsLoading(false);
                    }
                }
            },
            onError: (errors) => {
                console.error('Errore nella richiesta:', errors);
                setIsLoading(false);
            },
            ...options,
        });
    };

    const handleSearchChange = (value) => {
        setSearch(value);
    };

    const handleSearchByChange = (value) => {
        setSearchBy(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedSearch = search;

        if (search_by === 'status') {
            if (search.toLowerCase() === 'on') {
                updatedSearch = 'Y';
            }
            if (search.toLowerCase() === 'off') {
                updatedSearch = 'N';
            }
        }

        dataTableRequest(formAction, {
            ...filters,
            search_by: search_by,
            search: updatedSearch,
            per_page: perPage,
            page: 1,
        });
    };

    const handleSort = (key) => {
        let direction = SORT_ASC;
        if (filters.sort_key === key && filters.sort_direction === SORT_ASC) {
            direction = SORT_DESC;
        }
        dataTableRequest(formAction, {
            ...filters,
            sort_key: key,
            sort_direction: direction,
            per_page: perPage,
            page: 1,
        });
    };

    const handlePageChange = (link) => {
        let newPage;
        if (link.label.includes('Previous')) {
            newPage = page - 1;
        } else if (link.label.includes('Next')) {
            newPage = page + 1;
        } else {
            newPage = Number(link.label);
        }

        if (!isNaN(newPage)) {
            setPage(newPage);
            dataTableRequest(formAction, {
                ...filters,
                page: newPage,
            });
        }
    };

    const handlePerPageChange = (e) => {
        const value = e.target.value;
        setPerPage(value);
        dataTableRequest(formAction, {
            ...filters,
            per_page: value,
        });
    };

    const handleResetFilters = () => {
        setSearchBy(searchByDefault);
        setSearch('');
        setPerPage(perPageDefault);
        setPage(1);
        dataTableRequest(formAction, {});
    };

    const colRender = (col, item) => {
        if (col.field === 'id') {
            return `<span class="inline-block bg-sg px-1 rounded-full w-full text-white leading-7">${item.id}</span>`;
        }

        if (col.field === 'status') {
            return item.status === 'Y'
                ? '<span class="inline-block bg-green-400 rounded-full w-full leading-7">ON</span>'
                : '<span class="inline-block bg-red-400 rounded-full w-full leading-7">OFF</span>';
        }

        return item[col.field];
    };

    return (
        <div
            id='data-table-wrapper'
            className='relative'>
            {/* Loader Overlay */}
            {isLoading && (
                <div className='z-50 absolute inset-0 flex justify-center items-center bg-white bg-opacity-75'>
                    <BeatLoader
                        size={20}
                        color='#003ca6'
                    />
                </div>
            )}

            {/* Filters */}
            <div className='flex justify-between mb-4'>
                <div id='data-table-filters'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex'>
                            <select
                                className='block p-2 border rounded-s-md'
                                name='search_by'
                                id='search_by'
                                value={search_by}
                                onChange={(e) => handleSearchByChange(e.target.value)}>
                                {searchByOptions.map((field, index) => (
                                    <option
                                        key={index}
                                        value={field.field}>
                                        {field.label}
                                    </option>
                                ))}
                            </select>
                            <input
                                type='text'
                                placeholder='Cerca...'
                                name='search'
                                value={search}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className='block p-2 border'
                            />
                            <div className='flex rounded-e-md overflow-hidden'>
                                <button
                                    type='submit'
                                    className='block bg-sg px-3 py-1 text-white'>
                                    <MagnifyingGlassIcon className='w-4 h-4' />
                                </button>
                                <button
                                    type='reset'
                                    onClick={handleResetFilters}
                                    className='block bg-slate-500 px-3 py-1 text-white'>
                                    <ArrowPathIcon className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div id='data-table-export'></div>
            </div>

            {/* Table */}
            <div className='border max-h-[500px] overflow-y-auto'>
                <table
                    id='data-table'
                    className='border-separate bg-white min-w-full'
                    style={{ borderSpacing: 0 }}>
                    <thead className='top-0 z-10 sticky bg-white'>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.field}
                                    onClick={() => col.sortable && handleSort(col.field)}
                                    aria-sort={
                                        filters.sort_key === col.field
                                            ? filters.sort_direction === SORT_ASC
                                                ? 'ascending'
                                                : 'descending'
                                            : 'none'
                                    }
                                    className={`p-2 border-b border-l ${
                                        col.sortable ? 'cursor-pointer hover:bg-gray-100 group' : ''
                                    }`}
                                    width={col.width}>
                                    <span className={`flex items-center ${col.className}`}>
                                        {col.label}
                                        {col.sortable && (
                                            <span className='inline-block ml-1'>
                                                {filters.sort_key === col.field ? (
                                                    filters.sort_direction === SORT_ASC ? (
                                                        <ChevronUpIcon className='w-4 h-4' />
                                                    ) : (
                                                        <ChevronDownIcon className='w-4 h-4' />
                                                    )
                                                ) : (
                                                    <ChevronUpIcon className='opacity-0 group-hover:opacity-100 w-4 h-4 text-gray-400' />
                                                )}
                                            </span>
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length === 0 ? (
                            <tr>
                                <td
                                    className='p-4 border-b text-center text-gray-400'
                                    colSpan={columns.length}>
                                    No records found
                                </td>
                            </tr>
                        ) : (
                            data.data.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border-b ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                    }`}>
                                    {columns.map((col) => (
                                        <td
                                            key={col.field}
                                            className='p-2 border-l'
                                            align={col.align}
                                            dangerouslySetInnerHTML={{
                                                __html: colRender(col, item),
                                            }}></td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className='flex justify-between items-center mt-4'>
                <div>
                    <div className='flex items-center'>
                        <label
                            htmlFor='perPage'
                            className='mr-2'>
                            Showing:
                        </label>
                        <select
                            id='perPage'
                            value={perPage}
                            onChange={handlePerPageChange}
                            className='p-2 border rounded'>
                            {perPageOptions.map((option, index) => (
                                <option
                                    key={index}
                                    value={option}
                                    defaultValue={perPageDefault}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    {data.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(link)}
                            disabled={!link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`disabled:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                link.active
                                    ? 'bg-sg text-white pointer-events-none'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            } ${
                                index !== 0 && index !== data.links.length - 1
                                    ? 'w-8 h-8 rounded-full shadow-sm'
                                    : 'px-2 py-1 rounded-md'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataTable;
