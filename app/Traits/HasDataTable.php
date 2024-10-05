<?php

namespace App\Traits;

trait HasDataTable {
    protected $config = [
        'tableColumns' => [],
        'itemsPerPage' => 10,
        'perPageOptions' => [5, 10, 20, 50, 100],
        'searchBy' => 'id',
        'formAction' => '',
    ];

    public function getConfigTable() {
        return $this->config;
    }

    public function setConfigTable(array $config) {
        $this->config = array_merge($this->config, $config);
    }

    public function getConfigTableKey($key) {
        return $this->config[$key] ?? null;
    }
}