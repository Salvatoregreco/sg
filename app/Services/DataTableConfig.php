<?php

namespace App\Services;

class DataTableConfig
{
    public array $tableColumns = [];
    public int $itemsPerPage = 10;
    public array $perPageOptions = [5, 10, 20, 50, 100];
    public string $searchBy = 'id';
    public string $formAction = '';

    /**
     * Creates a new instance of DataTableConfig, applying the given configuration
     * properties to the object.
     *
     * @param array $config An associative array of configuration options
     */
    public function __construct(array $config = [])
    {
        foreach ($config as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }
}
