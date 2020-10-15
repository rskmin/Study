" ===
" === Auto load for first time uses
" ===
if empty(glob('~/.config/nvim/autoload/plug.vim'))
  silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
        \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

" ====================
" === Editor Setup ===
" ====================
" ===
" === System
" ===
let &t_ut=''
set autochdir " 切换编辑文件时自动切换工作目录

" ===
" === Editor behavior
" ===
set number  " 设置行号
set relativenumber  " 设置相对行号
set cursorline  " 突出当前行
set hidden " 允许在有未保存的修改时切换缓冲区，此时的修改由 vim 负责保存
set mouse=a " 允许鼠标操作
set expandtab " 使用tab插入制表符而不是指定数量空格
set tabstop=2
set shiftwidth=2
set softtabstop=2
set list
set listchars=tab:»■,trail:■ "行尾空格显示
set autoindent
set scrolloff=4 "上下留出4行
set ttimeoutlen=0
set notimeout
set viewoptions=cursor,folds,slash,unix
set wrap "宽度折叠
set tw=0 " 插入文本的最大宽度，0禁用
set indentexpr=
set foldmethod=indent " 代码折叠模式
set foldlevel=99 " 自动折叠设置
set foldenable
set formatoptions-=tc
set splitright " 打开时，拆分窗口将使新窗口位于窗口的右侧
set splitbelow " 打开时，拆分窗口将使新窗口位于窗口的底部
set noshowmode
set showcmd " 下方指令提示
set wildmenu " Tab提示
set ignorecase " 忽略大小写
set smartcase
set shortmess+=c "使补全时信息栏少一些无用信息
set inccommand=split
set completeopt=longest,noinsert,menuone,noselect,preview
set ttyfast " should make scrolling faster
set lazyredraw " same as above
set visualbell " 用视觉效果代替声音
silent !mkdir -p ~/.config/nvim/tmp/backup
silent !mkdir -p ~/.config/nvim/tmp/undo
set backupdir=~/.config/nvim/tmp/backup,. " 备份文件的目录列表
set directory=~/.config/nvim/tmp/backup,. " 交换文件的目录列表
if has('persistent_undo')
  set undofile
  set undodir=~/.config/nvim/tmp/undo,.
endif
set colorcolumn=100
set updatetime=100  " 加快vim响应
set virtualedit=block

au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif

" ===
" === Terminal Behaviors
" ===
let g:neoterm_autoscroll = 1
autocmd TermOpen term://* startinsert
tnoremap <C-M> <C-\><C-N>
tnoremap <C-O> <C-\><C-N><C-O>
noremap <LEADER>tm :set splitright<CR>:vs term://$SHELL<CR>
noremap <LEADER>/ :set splitbelow<CR>:split<CR>:res -5<CR>:term<CR>
let g:terminal_color_0  = '#000000'
let g:terminal_color_1  = '#FF5555'
let g:terminal_color_2  = '#50FA7B'
let g:terminal_color_3  = '#F1FA8C'
let g:terminal_color_4  = '#BD93F9'
let g:terminal_color_5  = '#FF79C6'
let g:terminal_color_6  = '#8BE9FD'
let g:terminal_color_7  = '#BFBFBF'
let g:terminal_color_8  = '#4D4D4D'
let g:terminal_color_9  = '#FF6E67'
let g:terminal_color_10 = '#5AF78E'
let g:terminal_color_11 = '#F4F99D'
let g:terminal_color_12 = '#CAA9FA'
let g:terminal_color_13 = '#FF92D0'
let g:terminal_color_14 = '#9AEDFE'

" ===
" === Basic Mappings
" ===
let mapleader=" " " 设置leader键
noremap ; :

" Save & quit
noremap <C-q> :qa<CR>
noremap <C-s> :w<CR>

" Open the vimrc file anytime
" noremap <LEADER>rc :e ~/.config/nvim/init.vim<CR>
"打开配置文件
nnoremap <leader>mc :vsplit $MYVIMRC<CR>
"重读配置文件
nnoremap <leader>me :source $MYVIMRC<CR>

" make Y to copy till the end of the line
nnoremap Y y$

" Copy to system clipboard
vnoremap Y "+y

" Indentation
nnoremap < <<
nnoremap > >>

" Search
noremap <LEADER><CR> :nohlsearch<CR>

" Space to Tab(将空格正则替换为tab)
nnoremap <LEADER>tt :%s/  /\t/g
vnoremap <LEADER>tt :s/ /\t/g

" Folding(折叠快捷键)
noremap <silent> <LEADER>o za

" Open up lazygit
noremap \g :Git
noremap <C-g> :tabe<CR>:-tabmove<CR>:term lazygit<CR>

" ===
" === Cursor Movement
" ===
inoremap jk <esc>
noremap \\ J
noremap J \
noremap J 5j
noremap K 5k

" N key: go to the start of the line
noremap <silent> H 0
" I key: go to the end of the line
noremap <silent> L $

" Faster in-line navigation
noremap W 5w
noremap B 6b

" ===
" === Insert Mode Cursor Movement
" ===
inoremap <C-a> <ESC>I
inoremap <C-e> <ESC>A
inoremap <C-f> <Right>
inoremap <C-b> <Left>

" ===
" === Command Mode Cursor Movement
" ===
cnoremap <C-a> <Home>
cnoremap <C-e> <End>
cnoremap <C-p> <Up>
cnoremap <C-n> <Down>
cnoremap <C-b> <Left>
cnoremap <C-f> <Right>
cnoremap <M-b> <S-Left>
cnoremap <M-f> <S-Right>

" 禁用默认的s键
noremap s <nop>

" 分割窗口
noremap sk :set nosplitbelow<CR>:split<CR>:set splitbelow<CR>
noremap sj :set splitbelow<CR>:split<CR>
noremap sh :set nosplitright<CR>:vsplit<CR>:set splitright<CR>
noremap sl :set splitright<CR>:vsplit<CR>
noremap sv <C-w>t<C-w>K
noremap sw <C-w>t<C-w>H
"屏幕大小设置
noremap <up> :res +5<CR>
noremap <down> :res -5<CR>
noremap <left> :vertical resize-5<CR>
noremap <right> :vertical resize+5<CR>

" ===
" === Tab management
" ===
" Create a new tab with tu
noremap tu :tabe<CR>
" Move around tabs
noremap th :-tabnext<CR>
noremap tl :+tabnext<CR>
" Move the tabs with tmn and tmi
noremap tmh :-tabmove<CR>
noremap tml :+tabmove<CR>

" ===
" === Basic Style
" ===
syntax enable "语法高亮
syntax on  "开启高亮
filetype on "文本识别
filetype indent on "针对不同文件采用不同缩进
filetype plugin on "允许插件
filetype plugin indent on "启动智能补全
"光标
let &t_SI = "\<Esc>]50;CursorShape=1\x7"
let &t_SR = "\<Esc>]50;CursorShape=2\x7"
let &t_EI = "\<Esc>]50;CursorShape=0\x7"
set encoding=utf-8  "字符集

" ===
" === Other useful
" ===
inoremap <C-l> <esc>A;<CR>
inoremap <C-d> <esc>f)a<space>{}<esc>i<CR><esc>ko

" Spelling Check with <space>sc
noremap <LEADER>sc :set spell!<CR>

" Press ` to change case (instead of ~)
noremap ` ~

" Auto change directory to current dir
autocmd BufEnter * silent! lcd %:p:h

" find and replace
noremap \s :%s//g<left><left>

" set wrap
noremap <LEADER>sw :set wrap<CR>

" Compile function
noremap <LEADER>ru :call CompileRunGcc()<CR>
func! CompileRunGcc()
  exec "w"
  if &filetype == 'c'
    exec "!g++ % -o %<"
    exec "!time ./%<"
  elseif &filetype == 'cpp'
    set splitbelow
    exec "!g++ -std=c++11 % -Wall -o %<"
    :sp
    :res -15
    :term ./%<
  elseif &filetype == 'java'
    exec "!javac %"
    exec "!time java %<"
  elseif &filetype == 'sh'
    :!time bash %
  elseif &filetype == 'python'
    set splitbelow
    :sp
    :term python3 %
  elseif &filetype == 'html'
    silent! exec "!".g:mkdp_browser." % &"
  elseif &filetype == 'markdown'
    exec "InstantMarkdownPreview"
  elseif &filetype == 'tex'
    silent! exec "VimtexStop"
    silent! exec "VimtexCompile"
  elseif &filetype == 'dart'
    exec "CocCommand flutter.run -d ".g:flutter_default_device
    silent! exec "CocCommand flutter.dev.openDevLog"
  elseif &filetype == 'javascript'
    set splitbelow
    :sp
    :term export DEBUG="INFO,ERROR,WARNING"; node --trace-warnings .
  elseif &filetype == 'go'
    set splitbelow
    :sp
    :term go run .
  endif
endfunc

" ===
" === Plugins with Vim-Plug
" ===
call plug#begin('~/.vim/plugged')

" Pretty Dress
Plug 'bling/vim-bufferline'
Plug 'bpietravalle/vim-bolt'
Plug 'theniceboy/vim-deus'

" Statue line
Plug 'ojroques/vim-scrollstatus'
Plug 'theniceboy/eleline.vim'
" Plug 'vim-airline/vim-airline'
" Plug 'tpope/vim-fugitive'

" General Highlighter
" Plug 'RRethy/vim-hexokinase', { 'do': 'make hexokinase' }
Plug 'RRethy/vim-illuminate'

" File navigation
Plug 'junegunn/fzf.vim' " 模糊搜索
Plug 'kevinhwang91/rnvimr' " vim ranger
Plug 'airblade/vim-rooter' " 自动跳转目录

"括号补齐
Plug 'jiangmiao/auto-pairs'

"简易注释
Plug 'scrooloose/nerdcommenter'

"符号两侧包围
Plug 'tpope/vim-surround'

"coc.nvim
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" 文件历史
Plug 'mbbill/undotree'

" Taglist
Plug 'liuchengxu/vista.vim'

" Autoformat
Plug 'Chiel92/vim-autoformat'

" Debugger
Plug 'puremourning/vimspector', {'do': './install_gadget.py --enable-c'}

call plug#end()

set re=0
set lazyredraw

" ===
" === Dress up vim
" ===
set termguicolors " enable true colors support
let $NVIM_TUI_ENABLE_TRUE_COLOR=1
"set background=dark
"let ayucolor="mirage"
"let g:oceanic_next_terminal_bold = 1
"let g:oceanic_next_terminal_italic = 1
"let g:one_allow_italics = 1

"color dracula
"color one
color deus
"color gruvbox
"let ayucolor="light"
"color ayu
"color xcodelighthc
"set background=light
"set cursorcolumn

hi NonText ctermfg=gray guifg=grey10
"hi SpecialKey ctermfg=blue guifg=grey70

" ===================== Start of Plugin Settings =====================

" ===
" === eleline.vim
" ===
let g:airline_powerline_fonts = 0

" ===
" === coc.nvim
" ===

let g:coc_global_extensions = [
      \ 'coc-json',
      \ 'coc-vimlsp',
      \ 'coc-clangd',
      \ 'coc-cmake']
" 补全使用tab
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction
" 查找上一个和下一个代码报错
nmap <silent> <LEADER>- <Plug>(coc-diagnostic-prev)
nmap <silent> <LEADER>+ <Plug>(coc-diagnostic-next)
" 查看函数定义和调用
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)
" 查看帮助
nnoremap <silent> <LEADER>h :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocActionAsync('doHover')
  endif
endfunction
" 打开代码补全
inoremap <silent><expr> <c-o> coc#refresh()

" ===
" === FZF
" ===
set rtp+=/usr/local/opt/fzf
set rtp+=/home/linuxbrew/.linuxbrew/opt/fzf
set rtp+=/home/david/.linuxbrew/opt/fzf
noremap <silent> <C-p> :Files<CR>
noremap <silent> <C-h> :History<CR>
noremap <silent> <C-l> :Lines<CR>
noremap <silent> <C-b> :Buffers<CR>
noremap <leader>; :History:<CR>

let g:fzf_preview_window = 'right:60%'
let g:fzf_commits_log_options = '--graph --color=always --format="%C(auto)%h%d %s %C(black)%C(bold)%cr"'

let g:fzf_layout = { 'window': { 'width': 0.9, 'height': 0.8 } }

" ===
" === rnvimr
" ===
let g:rnvimr_ex_enable = 1
let g:rnvimr_pick_enable = 1
let g:rnvimr_draw_border = 0
" let g:rnvimr_bw_enable = 1
highlight link RnvimrNormal CursorLine
nnoremap <silent> <C-f> :RnvimrToggle<CR><C-\><C-n>:RnvimrResize 0<CR>
let g:rnvimr_action = {
            \ '<C-t>': 'NvimEdit tabedit',
            \ '<C-x>': 'NvimEdit split',
            \ '<C-v>': 'NvimEdit vsplit',
            \ 'gw': 'JumpNvimCwd',
            \ 'yw': 'EmitRangerCwd'
            \ }
let g:rnvimr_layout = { 'relative': 'editor',
            \ 'width': &columns,
            \ 'height': &lines,
            \ 'col': 0,
            \ 'row': 0,
            \ 'style': 'minimal' }
let g:rnvimr_presets = [{'width': 1.0, 'height': 1.0}]

" ===
" === vim-rooter
" ===
let g:rooter_patterns = ['__vim_project_root', '.git/']
let g:rooter_silent_chdir = 1

" ===
" === Vista.vim
" ===
noremap <LEADER>v :Vista coc<CR>
noremap <C-t> :silent! Vista finder coc<CR>
let g:vista_icon_indent = ["╰─▸ ", "├─▸ "]
let g:vista_default_executive = 'ctags'
let g:vista_fzf_preview = ['right:50%']
let g:vista#renderer#enable_icon = 1
let g:vista#renderer#icons = {
\   "function": "\uf794",
\   "variable": "\uf71b",
\  }
" function! NearestMethodOrFunction() abort
" 	return get(b:, 'vista_nearest_method_or_function', '')
" endfunction
" set statusline+=%{NearestMethodOrFunction()}
" autocmd VimEnter * call vista#RunForNearestMethodOrFunction()

let g:scrollstatus_size = 15


" ===================== End of Plugin Settings =====================

" ===
" === Necessary Commands to Execute
" ===
exec "nohlsearch"
