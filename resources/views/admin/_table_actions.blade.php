@props(['editUrl', 'editLabel' => 'Edit', 'deleteUrl', 'deleteLabel' => 'Delete this item?', 'deleteFormId' => null])
<div class="flex items-center gap-2">
    <a href="{{ $editUrl }}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-colors" title="{{ $editLabel }}">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        Edit
    </a>
    <form action="{{ $deleteUrl }}" method="POST" class="inline" {{ $deleteFormId ? 'id='.$deleteFormId : '' }}>
        @csrf
        @method('DELETE')
        <button type="button" class="js-confirm-delete inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors" data-confirm-message="{{ $deleteLabel }}" title="Delete">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            Delete
        </button>
    </form>
</div>
