# SG - CMS

## Permessi

Il sistema di permessi si basa sulle seguenti tabelle:

* sg_roles: contiene i ruoli (es. 'admin', 'editor', 'user').
* sg_permissions: contiene i permessi (es. 'access_blog_module', 'access_user_module').
* sg_role_user: tabella pivot che associa gli utenti ai ruoli.
* sg_permission_role: tabella pivot che associa i permessi ai ruoli.
* sg_permission_user: tabella pivot che associa i permessi direttamente agli utenti.
  
### Assegnazione di ruoli e permessi

Puoi creare ruoli e permessi utilizzando i modelli Eloquent o tramite Seeder.

### Creazione di un ruolo

```php
$role = Role::create(['name' => 'editor', 'label' => 'Editore']);
```

### Creazione di un permesso

```php
$permission = Permission::create(['name' => 'access_blog_module', 'label' => 'Accesso al modulo Blog']);
```

### Assegnazione di permessi ad un ruolo

```php
$role = Role::where('name', 'editor')->first();
$permission = Permission::where('name', 'access_blog_module')->first();

$role->permissions()->attach($permission->id);
```

### Assegnazione di ruoli ad un utente

```php
$user = User::find(1);
$role = Role::where('name', 'editor')->first();

$user->roles()->attach($role->id);
```

### Assegnazione di permessi ad un utente

```php
$user = User::find(1);
$permission = Permission::where('name', 'access_blog_module')->first();

$user->permissions()->attach($permission->id);
```

### Verifica dei permessi

Per verificare se un utente ha un permesso, puoi usare il metodo `hasPermission()`.

```php
$user = User::find(1);

if ($user->hasPermission('access_blog_module')) {
    // Do something
}
```

Per verificare se un utente ha un ruolo, puoi usare il metodo `hasRole()`.

```php
$user = User::find(1);

if ($user->hasRole('admin')) {
    // Do something
}
```

### Protezione delle rotte con middleware

Per proteggere le rotte con il middleware `PermissionMiddleware`.

```php
Route::get('/blog', [BlogController::class, 'index'])->middleware('permission:access_blog_module');
```

### Frontend

Per verificare se un utente ha un permesso, puoi usare l'helper `hasPermission()`.  
In quanto i permessi sono resi disponibili tramite il metodo `share` nel middleware `HandleInertiaRequests`

```javascript
hasPermission(auth.permissions, 'access_blog_module')
```
