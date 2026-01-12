<template>
  <div class="icons-demo">
    <h2>图标展示</h2>
    
    <!-- 基本图标使用 - 按类别分组 -->
    <section class="section">
      <h3>基础图标</h3>
      <div class="icon-grid">
        <div v-for="icon in basicIcons" :key="icon.name" class="icon-item">
          <component :is="safeGetComponent(icon.component)" :size="28" @click="copyIconName(icon.name)" class="clickable-icon" />
          <span @click="copyIconName(icon.name)" class="clickable-name">{{ icon.name }}</span>
        </div>
      </div>
    </section>
    
    <section class="section">
      <h3>箭头图标</h3>
      <div class="icon-grid">
        <div v-for="icon in arrowIcons" :key="icon.name" class="icon-item">
          <component :is="safeGetComponent(icon.component)" :size="28" @click="copyIconName(icon.name)" class="clickable-icon" />
          <span @click="copyIconName(icon.name)" class="clickable-name">{{ icon.name }}</span>
        </div>
      </div>
    </section>
    
    <section class="section">
      <h3>导航图标</h3>
      <div class="icon-grid">
        <div v-for="icon in navigationIcons" :key="icon.name" class="icon-item">
          <component :is="safeGetComponent(icon.component)" :size="28" @click="copyIconName(icon.name)" class="clickable-icon" />
          <span @click="copyIconName(icon.name)" class="clickable-name">{{ icon.name }}</span>
        </div>
      </div>
    </section>
    
    <section class="section">
      <h3>操作图标</h3>
      <div class="icon-grid">
        <div v-for="icon in operationIcons" :key="icon.name" class="icon-item">
          <component :is="safeGetComponent(icon.component)" :size="28" @click="copyIconName(icon.name)" class="clickable-icon" />
          <span @click="copyIconName(icon.name)" class="clickable-name">{{ icon.name }}</span>
        </div>
      </div>
    </section>
    
    <section class="section">
      <h3>文件图标</h3>
      <div class="icon-grid">
        <div v-for="icon in fileIcons" :key="icon.name" class="icon-item">
          <component :is="safeGetComponent(icon.component)" :size="28" @click="copyIconName(icon.name)" class="clickable-icon" />
          <span @click="copyIconName(icon.name)" class="clickable-name">{{ icon.name }}</span>
        </div>
      </div>
    </section>
    
    <section class="section">
      <h3>用户图标</h3>
      <div class="icon-grid">
        <div v-for="icon in userIcons" :key="icon.name" class="icon-item">
          <component :is="safeGetComponent(icon.component)" :size="28" @click="copyIconName(icon.name)" class="clickable-icon" />
          <span @click="copyIconName(icon.name)" class="clickable-name">{{ icon.name }}</span>
        </div>
      </div>
    </section>
    
    <section class="section">
      <h3>设置图标</h3>
      <div class="icon-grid">
        <div v-for="icon in settingIcons" :key="icon.name" class="icon-item">
          <component :is="safeGetComponent(icon.component)" :size="28" @click="copyIconName(icon.name)" class="clickable-icon" />
          <span @click="copyIconName(icon.name)" class="clickable-name">{{ icon.name }}</span>
        </div>
      </div>
    </section>
    
    <section class="section">
      <h3>通知图标</h3>
      <div class="icon-grid">
        <div v-for="icon in notificationIcons" :key="icon.name" class="icon-item">
          <component :is="safeGetComponent(icon.component)" :size="28" @click="copyIconName(icon.name)" class="clickable-icon" />
          <span @click="copyIconName(icon.name)" class="clickable-name">{{ icon.name }}</span>
        </div>
      </div>
    </section>

    <!-- 图标大小控制 -->
    <section class="section">
      <h3>图标大小控制</h3>
      <div class="icon-sizes">
        <div v-for="size in sizes" :key="size" class="size-item">
          <Home :size="size <= 28 ? size : 28" />
          <span>Size: {{ size }}px</span>
        </div>
      </div>
    </section>

    <!-- 图标颜色控制 -->
    <section class="section">
      <h3>图标颜色控制</h3>
      <div class="icon-colors">
        <div v-for="color in colors" :key="color" class="color-item">
          <Home :size="28" :color="color" />
          <span>{{ color }}</span>
        </div>
      </div>
    </section>

    <!-- 动态图标 -->
    <section class="section">
      <h3>动态图标</h3>
      <div class="dynamic-icon">
        <component :is="safeGetComponent(currentIcon)" :size="64" />
        <select v-model="currentIconName" class="icon-selector">
          <option v-for="iconName in iconNames" :key="iconName" :value="iconName">
            {{ iconName }}
          </option>
        </select>
      </div>
    </section>

    <!-- 自定义图标 -->
    <section class="section">
      <h3>自定义图标</h3>
      <div class="custom-icon">
        <component :is="safeGetComponent(customIcon)" :size="48" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Home, 
  User, 
  Settings, 
  Search, 
  Heart, 
  Star, 
  Download, 
  Upload, 
  ArrowDown,
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightLeft,
  ArrowRightToLine,
  ArrowUp,
  ArrowUpToLine,
  ArrowUpDown,
  ArrowDownUp,
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowBigUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
  ChevronsUpDown,
  CornerDownLeft,
  CornerDownRight,
  CornerLeftDown,
  CornerLeftUp,
  CornerRightDown,
  CornerRightUp,
  CornerUpLeft,
  CornerUpRight,
  Menu,
  MenuSquare,
  MoreHorizontal,
  MoreVertical,
  Ellipsis,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Sidebar,
  SidebarClose,
  SidebarOpen,
  ArrowRightToLine as MdiMenuClose,
  ArrowLeftToLine as MdiMenuOpen,
  Plus,
  Minus,
  X,
  Check,
  Copy,
  Clipboard,
  ClipboardCopy,
  ClipboardCheck,
  ClipboardList,
  Save,
  Trash,
  Trash2,
  Edit,
  Edit2,
  Edit3,
  Pencil,
  PencilLine,
  SearchX,
  Filter,
  FilterX,
  SlidersHorizontal,
  SlidersVertical,
  RotateCw,
  RotateCcw,
  RefreshCw,
  RefreshCcw,
  Loader,
  Loader2,
  LoaderCircle,
  Eye,
  EyeOff,
  View,
  Maximize,
  Maximize2,
  Minimize,
  Minimize2,
  Expand,
  Shrink,
  Fullscreen,
  ZoomIn,
  ZoomOut,
  File,
  FileText,
  Files,
  Folder,
  FolderOpen,
  FolderClosed,
  FolderPlus,
  FolderMinus,
  FileEdit,
  FilePlus,
  FileMinus,
  FileCheck,
  FileX,
  BookOpenText,
  Book,
  BookOpen,
  UserRound,
  UserRoundPen,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Users,
  UsersRound,
  UserCircle,
  UserSquare,
  Settings2,
  Sliders,
  Wrench,
  Cog,
  BellOff,
  BellRing,
  MailOpen,
  MailCheck,
  MailX,
  MailPlus,
  Inbox,
  Send,
  MessageCircle,
  MessageSquare,
  Circle,
  CircleAlert,
  CircleCheck,
  CircleCheckBig,
  CircleHelp,
  CircleX,
  CircleDot,
  Square,
  SquareCheck,
  SquareCheckBig,
  SquareMinus,
  SquarePlus,
  SquareX,
  CheckCircle,
  CheckSquare,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  XCircle,
  XSquare,
  LockKeyhole,
  Unlock,
  Key,
  KeyRound,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  MoonStar,
  SunMoon,
  Palette,
  Paintbrush,
  Pipette,
  SwatchBook,
  Contrast,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  AlignVerticalJustifyCenter,
  AlignHorizontalJustifyCenter,
  SortAsc,
  SortDesc,
  List,
  ListOrdered,
  ListChecks,
  ListTree,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  Clock,
  Timer,
  Hourglass,
  BarChart,
  BarChart2,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Music,
  Image,
  Video,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageCircle as Comment,
  Link2,
  Unlink,
  ExternalLink,
  Compass,
  Map,
  MapPin,
  Navigation,
  Tag,
  Tags,
  Bookmark,
  BookmarkPlus,
  Flag,
  Pin,
  PinOff,
  Grid2x2,
  LayoutGrid,
  LayoutList,
  LayoutDashboard,
  Columns,
  Rows,
  Code2,
  Terminal,
  FileCode,
  Braces,
  Bug,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Github,
  ShoppingBag,
  CreditCard,
  DollarSign,
  Package,
  Box,
  WifiOff,
  Signal,
  Bluetooth,
  Cast,
  Radio,
  Antenna,
  PowerOff,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  Zap,
  CloudRain,
  CloudSnow,
  CloudSun,
  CloudMoon,
  Award,
  BadgeCheck,
  Briefcase,
  Building,
  Camera,
  Phone,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Printer,
  Languages,
  Globe,
  Grip,
  GripVertical,
  GripHorizontal,
  Move,
  FoldHorizontal,
  FoldVertical,
  UnfoldHorizontal,
  UnfoldVertical,
  InspectionPanel,
  LogOut,
  LogIn,
  createIconifyIcon,
  Mail,
  Bell,
  LockOpen,
  Sun,
  Moon,
  Calendar,
  Share,
  Link,
  Grid,
  Code,
  ShoppingCart,
  Wifi,
  Power,
  Cloud,

} from '@admin-core/icons'

// 基础图标
const basicIcons = [
  { name: 'Home', component: Home },
  { name: 'Search', component: Search },
  { name: 'Heart', component: Heart },
  { name: 'Star', component: Star },
  { name: 'Tag', component: Tag },
  { name: 'Grid', component: Grid },
  { name: 'Code', component: Code },
  { name: 'ShoppingCart', component: ShoppingCart },
  { name: 'CreditCard', component: CreditCard },
  { name: 'Wifi', component: Wifi },
  { name: 'Power', component: Power },
  { name: 'Cloud', component: Cloud },
  { name: 'Award', component: Award },
  { name: 'Briefcase', component: Briefcase },
  { name: 'Camera', component: Camera },
  { name: 'Image', component: Image },
  { name: 'Share', component: Share },
  { name: 'Link', component: Link },
  { name: 'Palette', component: Palette },
  { name: 'Paintbrush', component: Paintbrush },
  { name: 'Pipette', component: Pipette },
  { name: 'SwatchBook', component: SwatchBook },
  { name: 'Contrast', component: Contrast },
  { name: 'Sun', component: Sun },
  { name: 'Moon', component: Moon },
  { name: 'SunMoon', component: SunMoon },
  { name: 'MoonStar', component: MoonStar },
  { name: 'Languages', component: Languages },
  { name: 'Globe', component: Globe },
  { name: 'Compass', component: Compass },
  { name: 'Map', component: Map },
  { name: 'MapPin', component: MapPin },
  { name: 'Navigation', component: Navigation },
  { name: 'Flag', component: Flag },
  { name: 'Pin', component: Pin },
  { name: 'PinOff', component: PinOff },
  { name: 'Building', component: Building },
  { name: 'Phone', component: Phone },
  { name: 'Smartphone', component: Smartphone },
  { name: 'Tablet', component: Tablet },
  { name: 'Laptop', component: Laptop },
  { name: 'Monitor', component: Monitor },
  { name: 'Printer', component: Printer },
  { name: 'Video', component: Video },
  { name: 'Music', component: Music },
  { name: 'Zap', component: Zap },
  { name: 'Battery', component: Battery },
  { name: 'BatteryCharging', component: BatteryCharging },
  { name: 'BatteryFull', component: BatteryFull },
  { name: 'BatteryLow', component: BatteryLow },
  { name: 'PowerOff', component: PowerOff },
  { name: 'Signal', component: Signal },
  { name: 'Bluetooth', component: Bluetooth },
  { name: 'Cast', component: Cast },
  { name: 'Radio', component: Radio },
  { name: 'Antenna', component: Antenna },
  { name: 'CloudRain', component: CloudRain },
  { name: 'CloudSnow', component: CloudSnow },
  { name: 'CloudSun', component: CloudSun },
  { name: 'CloudMoon', component: CloudMoon },
  { name: 'Volume', component: Volume },
  { name: 'Volume1', component: Volume1 },
  { name: 'Volume2', component: Volume2 },
  { name: 'VolumeX', component: VolumeX },
  { name: 'Download', component: Download },
  { name: 'Upload', component: Upload },
  { name: 'Key', component: Key },
  { name: 'KeyRound', component: KeyRound },
  { name: 'LockOpen', component: LockOpen },
  { name: 'Unlock', component: Unlock },
  { name: 'LockKeyhole', component: LockKeyhole },
  { name: 'Shield', component: Shield },
  { name: 'ShieldCheck', component: ShieldCheck },
  { name: 'ShieldAlert', component: ShieldAlert },
  { name: 'ShieldX', component: ShieldX },
  { name: 'LogOut', component: LogOut },
  { name: 'LogIn', component: LogIn },
];

// 箭头图标
const arrowIcons = [
  { name: 'ArrowDown', component: ArrowDown },
  { name: 'ArrowLeft', component: ArrowLeft },
  { name: 'ArrowRight', component: ArrowRight },
  { name: 'ArrowUp', component: ArrowUp },
  { name: 'ArrowLeftToLine', component: ArrowLeftToLine },
  { name: 'ArrowRightLeft', component: ArrowRightLeft },
  { name: 'ArrowRightToLine', component: ArrowRightToLine },
  { name: 'ArrowUpToLine', component: ArrowUpToLine },
  { name: 'ArrowUpDown', component: ArrowUpDown },
  { name: 'ArrowDownUp', component: ArrowDownUp },
  { name: 'ArrowBigDown', component: ArrowBigDown },
  { name: 'ArrowBigLeft', component: ArrowBigLeft },
  { name: 'ArrowBigRight', component: ArrowBigRight },
  { name: 'ArrowBigUp', component: ArrowBigUp },
  { name: 'ChevronDown', component: ChevronDown },
  { name: 'ChevronLeft', component: ChevronLeft },
  { name: 'ChevronRight', component: ChevronRight },
  { name: 'ChevronUp', component: ChevronUp },
  { name: 'ChevronsDown', component: ChevronsDown },
  { name: 'ChevronsLeft', component: ChevronsLeft },
  { name: 'ChevronsRight', component: ChevronsRight },
  { name: 'ChevronsUp', component: ChevronsUp },
  { name: 'ChevronsUpDown', component: ChevronsUpDown },
  { name: 'CornerDownLeft', component: CornerDownLeft },
  { name: 'CornerDownRight', component: CornerDownRight },
  { name: 'CornerLeftDown', component: CornerLeftDown },
  { name: 'CornerLeftUp', component: CornerLeftUp },
  { name: 'CornerRightDown', component: CornerRightDown },
  { name: 'CornerRightUp', component: CornerRightUp },
  { name: 'CornerUpLeft', component: CornerUpLeft },
  { name: 'CornerUpRight', component: CornerUpRight },
];

// 导航图标
const navigationIcons = [
  { name: 'Menu', component: Menu },
  { name: 'MenuSquare', component: MenuSquare },
  { name: 'MdiMenuClose', component: MdiMenuClose },
  { name: 'MdiMenuOpen', component: MdiMenuOpen },
  { name: 'MoreHorizontal', component: MoreHorizontal },
  { name: 'MoreVertical', component: MoreVertical },
  { name: 'Ellipsis', component: Ellipsis },
  { name: 'PanelLeft', component: PanelLeft },
  { name: 'PanelRight', component: PanelRight },
  { name: 'PanelTop', component: PanelTop },
  { name: 'PanelBottom', component: PanelBottom },
  { name: 'PanelLeftClose', component: PanelLeftClose },
  { name: 'PanelLeftOpen', component: PanelLeftOpen },
  { name: 'PanelRightClose', component: PanelRightClose },
  { name: 'PanelRightOpen', component: PanelRightOpen },
  { name: 'Sidebar', component: Sidebar },
  { name: 'SidebarClose', component: SidebarClose },
  { name: 'SidebarOpen', component: SidebarOpen },
];

// 操作图标
const operationIcons = [
  { name: 'Plus', component: Plus },
  { name: 'Minus', component: Minus },
  { name: 'X', component: X },
  { name: 'Check', component: Check },
  { name: 'Copy', component: Copy },
  { name: 'Clipboard', component: Clipboard },
  { name: 'ClipboardCopy', component: ClipboardCopy },
  { name: 'ClipboardCheck', component: ClipboardCheck },
  { name: 'ClipboardList', component: ClipboardList },
  { name: 'Save', component: Save },
  { name: 'Trash', component: Trash },
  { name: 'Trash2', component: Trash2 },
  { name: 'Edit', component: Edit },
  { name: 'Edit2', component: Edit2 },
  { name: 'Edit3', component: Edit3 },
  { name: 'Pencil', component: Pencil },
  { name: 'PencilLine', component: PencilLine },
  { name: 'Eye', component: Eye },
  { name: 'EyeOff', component: EyeOff },
  { name: 'View', component: View },
  { name: 'Maximize', component: Maximize },
  { name: 'Maximize2', component: Maximize2 },
  { name: 'Minimize', component: Minimize },
  { name: 'Minimize2', component: Minimize2 },
  { name: 'Expand', component: Expand },
  { name: 'Shrink', component: Shrink },
  { name: 'Fullscreen', component: Fullscreen },
  { name: 'ZoomIn', component: ZoomIn },
  { name: 'ZoomOut', component: ZoomOut },
  { name: 'RotateCw', component: RotateCw },
  { name: 'RotateCcw', component: RotateCcw },
  { name: 'RefreshCw', component: RefreshCw },
  { name: 'RefreshCcw', component: RefreshCcw },
  { name: 'Loader', component: Loader },
  { name: 'Loader2', component: Loader2 },
  { name: 'LoaderCircle', component: LoaderCircle },
  { name: 'SearchX', component: SearchX },
  { name: 'Filter', component: Filter },
  { name: 'FilterX', component: FilterX },
  { name: 'SlidersHorizontal', component: SlidersHorizontal },
  { name: 'SlidersVertical', component: SlidersVertical },
  { name: 'Sliders', component: Sliders },
  { name: 'Wrench', component: Wrench },
  { name: 'Cog', component: Cog },
  { name: 'Settings2', component: Settings2 },
  { name: 'Grip', component: Grip },
  { name: 'GripVertical', component: GripVertical },
  { name: 'GripHorizontal', component: GripHorizontal },
  { name: 'Move', component: Move },
  { name: 'FoldHorizontal', component: FoldHorizontal },
  { name: 'FoldVertical', component: FoldVertical },
  { name: 'UnfoldHorizontal', component: UnfoldHorizontal },
  { name: 'UnfoldVertical', component: UnfoldVertical },
  { name: 'InspectionPanel', component: InspectionPanel },
];

// 文件图标
const fileIcons = [
  { name: 'File', component: File },
  { name: 'FileText', component: FileText },
  { name: 'Files', component: Files },
  { name: 'Folder', component: Folder },
  { name: 'FolderOpen', component: FolderOpen },
  { name: 'FolderClosed', component: FolderClosed },
  { name: 'FolderPlus', component: FolderPlus },
  { name: 'FolderMinus', component: FolderMinus },
  { name: 'FileEdit', component: FileEdit },
  { name: 'FilePlus', component: FilePlus },
  { name: 'FileMinus', component: FileMinus },
  { name: 'FileCheck', component: FileCheck },
  { name: 'FileX', component: FileX },
  { name: 'BookOpenText', component: BookOpenText },
  { name: 'Book', component: Book },
  { name: 'BookOpen', component: BookOpen },
  { name: 'FileCode', component: FileCode },
  { name: 'Braces', component: Braces },
  { name: 'Bug', component: Bug },
  { name: 'GitBranch', component: GitBranch },
  { name: 'GitCommit', component: GitCommit },
  { name: 'GitMerge', component: GitMerge },
  { name: 'GitPullRequest', component: GitPullRequest },
  { name: 'Github', component: Github },
  { name: 'ShoppingBag', component: ShoppingBag },
  { name: 'DollarSign', component: DollarSign },
  { name: 'Package', component: Package },
  { name: 'Box', component: Box },
  { name: 'Link2', component: Link2 },
  { name: 'Unlink', component: Unlink },
  { name: 'ExternalLink', component: ExternalLink },
  { name: 'Bookmark', component: Bookmark },
  { name: 'BookmarkPlus', component: BookmarkPlus },
];

// 用户图标
const userIcons = [
  { name: 'User', component: User },
  { name: 'UserRound', component: UserRound },
  { name: 'UserRoundPen', component: UserRoundPen },
  { name: 'UserPlus', component: UserPlus },
  { name: 'UserMinus', component: UserMinus },
  { name: 'UserCheck', component: UserCheck },
  { name: 'UserX', component: UserX },
  { name: 'Users', component: Users },
  { name: 'UsersRound', component: UsersRound },
  { name: 'UserCircle', component: UserCircle },
  { name: 'UserSquare', component: UserSquare },
  { name: 'Settings', component: Settings },
  { name: 'Settings2', component: Settings2 },
  { name: 'ThumbsUp', component: ThumbsUp },
  { name: 'ThumbsDown', component: ThumbsDown },
  { name: 'MessageSquare', component: MessageSquare },
  { name: 'MessageCircle', component: MessageCircle },
  { name: 'Comment', component: Comment },
  { name: 'Mail', component: Mail },
  { name: 'MailOpen', component: MailOpen },
  { name: 'MailCheck', component: MailCheck },
  { name: 'MailX', component: MailX },
  { name: 'MailPlus', component: MailPlus },
  { name: 'Inbox', component: Inbox },
  { name: 'Send', component: Send },
  { name: 'Share2', component: Share2 },
];

// 设置图标
const settingIcons = [
  { name: 'Calendar', component: Calendar },
  { name: 'CalendarDays', component: CalendarDays },
  { name: 'CalendarCheck', component: CalendarCheck },
  { name: 'CalendarX', component: CalendarX },
  { name: 'CalendarPlus', component: CalendarPlus },
  { name: 'Clock', component: Clock },
  { name: 'Timer', component: Timer },
  { name: 'Hourglass', component: Hourglass },
  { name: 'Play', component: Play },
  { name: 'Pause', component: Pause },
  { name: 'SkipForward', component: SkipForward },
  { name: 'SkipBack', component: SkipBack },
  { name: 'FastForward', component: FastForward },
  { name: 'Rewind', component: Rewind },
  { name: 'BarChart', component: BarChart },
  { name: 'BarChart2', component: BarChart2 },
  { name: 'BarChart3', component: BarChart3 },
  { name: 'LineChart', component: LineChart },
  { name: 'PieChart', component: PieChart },
  { name: 'TrendingUp', component: TrendingUp },
  { name: 'TrendingDown', component: TrendingDown },
  { name: 'Activity', component: Activity },
  { name: 'List', component: List },
  { name: 'ListOrdered', component: ListOrdered },
  { name: 'ListChecks', component: ListChecks },
  { name: 'ListTree', component: ListTree },
  { name: 'SortAsc', component: SortAsc },
  { name: 'SortDesc', component: SortDesc },
  { name: 'AlignLeft', component: AlignLeft },
  { name: 'AlignCenter', component: AlignCenter },
  { name: 'AlignRight', component: AlignRight },
  { name: 'AlignJustify', component: AlignJustify },
  { name: 'AlignVerticalJustifyCenter', component: AlignVerticalJustifyCenter },
  { name: 'AlignHorizontalJustifyCenter', component: AlignHorizontalJustifyCenter },
  { name: 'Columns', component: Columns },
  { name: 'Rows', component: Rows },
  { name: 'LayoutGrid', component: LayoutGrid },
  { name: 'LayoutList', component: LayoutList },
  { name: 'LayoutDashboard', component: LayoutDashboard },
  { name: 'Grid2x2', component: Grid2x2 },
  { name: 'Terminal', component: Terminal },
];

// 通知图标
const notificationIcons = [
  { name: 'Bell', component: Bell },
  { name: 'BellOff', component: BellOff },
  { name: 'BellRing', component: BellRing },
  { name: 'Circle', component: Circle },
  { name: 'CircleAlert', component: CircleAlert },
  { name: 'CircleCheck', component: CircleCheck },
  { name: 'CircleCheckBig', component: CircleCheckBig },
  { name: 'CircleHelp', component: CircleHelp },
  { name: 'CircleX', component: CircleX },
  { name: 'CircleDot', component: CircleDot },
  { name: 'Square', component: Square },
  { name: 'SquareCheck', component: SquareCheck },
  { name: 'SquareCheckBig', component: SquareCheckBig },
  { name: 'SquareMinus', component: SquareMinus },
  { name: 'SquarePlus', component: SquarePlus },
  { name: 'SquareX', component: SquareX },
  { name: 'CheckCircle', component: CheckCircle },
  { name: 'CheckSquare', component: CheckSquare },
  { name: 'AlertCircle', component: AlertCircle },
  { name: 'AlertTriangle', component: AlertTriangle },
  { name: 'Info', component: Info },
  { name: 'HelpCircle', component: HelpCircle },
  { name: 'XCircle', component: XCircle },
  { name: 'XSquare', component: XSquare },
  { name: 'BadgeCheck', component: BadgeCheck },
  { name: 'Tags', component: Tags },
  { name: 'Tag', component: Tag },
];

// 剩余图标 - 用于基本图标展示
const remainingIcons = [

  { name: 'Home', component: Home },
  { name: 'User', component: User },
  { name: 'Settings', component: Settings },
  { name: 'Search', component: Search },
  { name: 'Heart', component: Heart },
  { name: 'Star', component: Star },
  { name: 'Download', component: Download },
  { name: 'Upload', component: Upload },
  { name: 'ArrowDown', component: ArrowDown },
  { name: 'ArrowLeft', component: ArrowLeft },
  { name: 'ArrowRight', component: ArrowRight },
  { name: 'ArrowUp', component: ArrowUp },
  { name: 'ChevronDown', component: ChevronDown },
  { name: 'ChevronLeft', component: ChevronLeft },
  { name: 'ChevronRight', component: ChevronRight },
  { name: 'ChevronUp', component: ChevronUp },
  { name: 'Menu', component: Menu },
  { name: 'MoreHorizontal', component: MoreHorizontal },
  { name: 'MoreVertical', component: MoreVertical },
  { name: 'Plus', component: Plus },
  { name: 'Minus', component: Minus },
  { name: 'X', component: X },
  { name: 'Check', component: Check },
  { name: 'Copy', component: Copy },
  { name: 'Clipboard', component: Clipboard },
  { name: 'Save', component: Save },
  { name: 'Trash', component: Trash },
  { name: 'Edit', component: Edit },
  { name: 'Eye', component: Eye },
  { name: 'EyeOff', component: EyeOff },
  { name: 'File', component: File },
  { name: 'FileText', component: FileText },
  { name: 'Folder', component: Folder },

  { name: 'FolderOpen', component: FolderOpen },
  { name: 'Mail', component: Mail },
  { name: 'Bell', component: Bell },
  { name: 'Circle', component: Circle },
  { name: 'CircleCheck', component: CircleCheck },
  { name: 'CircleX', component: CircleX },
  { name: 'Square', component: Square },
  { name: 'SquareCheck', component: SquareCheck },

  { name: 'Key', component: Key },
  { name: 'LockOpen', component: LockOpen },
  { name: 'Sun', component: Sun },
  { name: 'Moon', component: Moon },
  { name: 'Palette', component: Palette },
  { name: 'Calendar', component: Calendar },
  { name: 'Clock', component: Clock },
  { name: 'Play', component: Play },
  { name: 'Pause', component: Pause },
  { name: 'Image', component: Image },
  { name: 'Share', component: Share },
  { name: 'Link', component: Link },
  { name: 'Tag', component: Tag },
  { name: 'Grid', component: Grid },
  { name: 'Code', component: Code },
  { name: 'ShoppingCart', component: ShoppingCart },
  { name: 'CreditCard', component: CreditCard },
  { name: 'Wifi', component: Wifi },
  { name: 'Power', component: Power },
  { name: 'Cloud', component: Cloud },
  { name: 'Award', component: Award },
  { name: 'Briefcase', component: Briefcase },
  { name: 'Camera', component: Camera },
  { name: 'Phone', component: Phone },
  { name: 'Smartphone', component: Smartphone },
  { name: 'Tablet', component: Tablet },
  { name: 'Laptop', component: Laptop },
  { name: 'Monitor', component: Monitor },
  { name: 'Printer', component: Printer },
  { name: 'Languages', component: Languages },
  { name: 'Globe', component: Globe },
  { name: 'Grip', component: Grip },
  { name: 'GripVertical', component: GripVertical },
  { name: 'GripHorizontal', component: GripHorizontal },
  { name: 'Move', component: Move },
  { name: 'FoldHorizontal', component: FoldHorizontal },
  { name: 'FoldVertical', component: FoldVertical },
  { name: 'UnfoldHorizontal', component: UnfoldHorizontal },
  { name: 'UnfoldVertical', component: UnfoldVertical },
  { name: 'InspectionPanel', component: InspectionPanel },
  { name: 'LogOut', component: LogOut },
  { name: 'LogIn', component: LogIn },
  // 添加之前导入但未使用的图标
  { name: 'ArrowLeftToLine', component: ArrowLeftToLine },
  { name: 'ArrowRightLeft', component: ArrowRightLeft },
  { name: 'ArrowRightToLine', component: ArrowRightToLine },
  { name: 'ArrowUpToLine', component: ArrowUpToLine },
  { name: 'ArrowUpDown', component: ArrowUpDown },
  { name: 'ArrowDownUp', component: ArrowDownUp },
  { name: 'ArrowBigDown', component: ArrowBigDown },
  { name: 'ArrowBigLeft', component: ArrowBigLeft },
  { name: 'ArrowBigRight', component: ArrowBigRight },
  { name: 'ArrowBigUp', component: ArrowBigUp },
  { name: 'ChevronsDown', component: ChevronsDown },
  { name: 'ChevronsLeft', component: ChevronsLeft },
  { name: 'ChevronsRight', component: ChevronsRight },
  { name: 'ChevronsUp', component: ChevronsUp },
  { name: 'ChevronsUpDown', component: ChevronsUpDown },
  { name: 'CornerDownLeft', component: CornerDownLeft },
  { name: 'CornerDownRight', component: CornerDownRight },
  { name: 'CornerLeftDown', component: CornerLeftDown },
  { name: 'CornerLeftUp', component: CornerLeftUp },
  { name: 'CornerRightDown', component: CornerRightDown },
  { name: 'CornerRightUp', component: CornerRightUp },
  { name: 'CornerUpLeft', component: CornerUpLeft },
  { name: 'CornerUpRight', component: CornerUpRight },
  { name: 'MenuSquare', component: MenuSquare },
  { name: 'Ellipsis', component: Ellipsis },
  { name: 'PanelLeft', component: PanelLeft },
  { name: 'PanelRight', component: PanelRight },
  { name: 'PanelTop', component: PanelTop },
  { name: 'PanelBottom', component: PanelBottom },
  { name: 'PanelLeftClose', component: PanelLeftClose },
  { name: 'PanelLeftOpen', component: PanelLeftOpen },
  { name: 'PanelRightClose', component: PanelRightClose },
  { name: 'PanelRightOpen', component: PanelRightOpen },
  { name: 'Sidebar', component: Sidebar },
  { name: 'SidebarClose', component: SidebarClose },
  { name: 'SidebarOpen', component: SidebarOpen },
  { name: 'MdiMenuClose', component: MdiMenuClose },
  { name: 'MdiMenuOpen', component: MdiMenuOpen },
  { name: 'Trash2', component: Trash2 },
  { name: 'Edit2', component: Edit2 },
  { name: 'Edit3', component: Edit3 },
  { name: 'Pencil', component: Pencil },
  { name: 'PencilLine', component: PencilLine },
  { name: 'SearchX', component: SearchX },
  { name: 'Filter', component: Filter },
  { name: 'FilterX', component: FilterX },
  { name: 'SlidersHorizontal', component: SlidersHorizontal },
  { name: 'SlidersVertical', component: SlidersVertical },
  { name: 'RotateCw', component: RotateCw },
  { name: 'RotateCcw', component: RotateCcw },
  { name: 'RefreshCw', component: RefreshCw },
  { name: 'RefreshCcw', component: RefreshCcw },
  { name: 'Loader', component: Loader },
  { name: 'Loader2', component: Loader2 },
  { name: 'LoaderCircle', component: LoaderCircle },
  { name: 'View', component: View },
  { name: 'Maximize', component: Maximize },
  { name: 'Maximize2', component: Maximize2 },
  { name: 'Minimize', component: Minimize },
  { name: 'Minimize2', component: Minimize2 },
  { name: 'Expand', component: Expand },
  { name: 'Shrink', component: Shrink },
  { name: 'Fullscreen', component: Fullscreen },
  { name: 'ZoomIn', component: ZoomIn },
  { name: 'ZoomOut', component: ZoomOut },
  { name: 'Files', component: Files },
  { name: 'FolderClosed', component: FolderClosed },
  { name: 'FolderPlus', component: FolderPlus },
  { name: 'FolderMinus', component: FolderMinus },
  { name: 'FileEdit', component: FileEdit },
  { name: 'FilePlus', component: FilePlus },
  { name: 'FileMinus', component: FileMinus },
  { name: 'FileCheck', component: FileCheck },
  { name: 'FileX', component: FileX },
  { name: 'BookOpenText', component: BookOpenText },
  { name: 'Book', component: Book },
  { name: 'BookOpen', component: BookOpen },
  { name: 'UserRound', component: UserRound },
  { name: 'UserRoundPen', component: UserRoundPen },
  { name: 'UserPlus', component: UserPlus },
  { name: 'UserMinus', component: UserMinus },
  { name: 'UserCheck', component: UserCheck },
  { name: 'UserX', component: UserX },
  { name: 'Users', component: Users },
  { name: 'UsersRound', component: UsersRound },
  { name: 'UserCircle', component: UserCircle },
  { name: 'UserSquare', component: UserSquare },
  { name: 'Settings2', component: Settings2 },
  { name: 'Sliders', component: Sliders },
  { name: 'Wrench', component: Wrench },
  { name: 'Cog', component: Cog },
  { name: 'BellOff', component: BellOff },
  { name: 'BellRing', component: BellRing },
  { name: 'MailOpen', component: MailOpen },
  { name: 'MailCheck', component: MailCheck },
  { name: 'MailX', component: MailX },
  { name: 'MailPlus', component: MailPlus },
  { name: 'Inbox', component: Inbox },
  { name: 'Send', component: Send },
  { name: 'MessageSquare', component: MessageSquare },
  { name: 'MessageCircle', component: MessageCircle },
  { name: 'Comment', component: Comment },

  { name: 'Link2', component: Link2 },
  { name: 'Unlink', component: Unlink },
  { name: 'ExternalLink', component: ExternalLink },
  { name: 'Compass', component: Compass },
  { name: 'Map', component: Map },
  { name: 'MapPin', component: MapPin },
  { name: 'Navigation', component: Navigation },
  { name: 'Tags', component: Tags },
  { name: 'Bookmark', component: Bookmark },
  { name: 'BookmarkPlus', component: BookmarkPlus },
  { name: 'Flag', component: Flag },
  { name: 'Pin', component: Pin },
  { name: 'PinOff', component: PinOff },
  { name: 'Grid2x2', component: Grid2x2 },
  { name: 'LayoutGrid', component: LayoutGrid },
  { name: 'LayoutList', component: LayoutList },
  { name: 'LayoutDashboard', component: LayoutDashboard },
  { name: 'Columns', component: Columns },
  { name: 'Rows', component: Rows },
  { name: 'Code2', component: Code2 },
  { name: 'Terminal', component: Terminal },
  { name: 'FileCode', component: FileCode },
  { name: 'Braces', component: Braces },
  { name: 'Bug', component: Bug },
  { name: 'GitBranch', component: GitBranch },
  { name: 'GitCommit', component: GitCommit },
  { name: 'GitMerge', component: GitMerge },
  { name: 'GitPullRequest', component: GitPullRequest },
  { name: 'Github', component: Github },
  { name: 'ShoppingBag', component: ShoppingBag },
  { name: 'DollarSign', component: DollarSign },
  { name: 'Package', component: Package },
  { name: 'Box', component: Box },
  { name: 'WifiOff', component: WifiOff },
  { name: 'Signal', component: Signal },
  { name: 'Bluetooth', component: Bluetooth },
  { name: 'Cast', component: Cast },
  { name: 'Radio', component: Radio },
  { name: 'Antenna', component: Antenna },
  { name: 'PowerOff', component: PowerOff },
  { name: 'Battery', component: Battery },
  { name: 'BatteryCharging', component: BatteryCharging },
  { name: 'BatteryFull', component: BatteryFull },
  { name: 'BatteryLow', component: BatteryLow },
  { name: 'Zap', component: Zap },
  { name: 'CloudRain', component: CloudRain },
  { name: 'CloudSnow', component: CloudSnow },
  { name: 'CloudSun', component: CloudSun },
  { name: 'CloudMoon', component: CloudMoon },
  { name: 'BadgeCheck', component: BadgeCheck },
  { name: 'Briefcase', component: Briefcase },
  { name: 'Building', component: Building },
  { name: 'Video', component: Video },
  { name: 'Share2', component: Share2 },
  { name: 'ThumbsUp', component: ThumbsUp },
  { name: 'ThumbsDown', component: ThumbsDown },
  { name: 'ClipboardCopy', component: ClipboardCopy },
  { name: 'ClipboardCheck', component: ClipboardCheck },
  { name: 'ClipboardList', component: ClipboardList },
  { name: 'CircleAlert', component: CircleAlert },
  { name: 'CircleCheckBig', component: CircleCheckBig },
  { name: 'CircleHelp', component: CircleHelp },
  { name: 'CircleX', component: CircleX },
  { name: 'CircleDot', component: CircleDot },
  { name: 'SquareCheckBig', component: SquareCheckBig },
  { name: 'SquareMinus', component: SquareMinus },
  { name: 'SquarePlus', component: SquarePlus },
  { name: 'SquareX', component: SquareX },
  { name: 'CheckCircle', component: CheckCircle },
  { name: 'CheckSquare', component: CheckSquare },
  { name: 'AlertCircle', component: AlertCircle },
  { name: 'AlertTriangle', component: AlertTriangle },
  { name: 'Info', component: Info },
  { name: 'HelpCircle', component: HelpCircle },
  { name: 'XCircle', component: XCircle },
  { name: 'XSquare', component: XSquare },
  { name: 'LockKeyhole', component: LockKeyhole },
  { name: 'Unlock', component: Unlock },
  { name: 'KeyRound', component: KeyRound },
  { name: 'Shield', component: Shield },
  { name: 'ShieldCheck', component: ShieldCheck },
  { name: 'ShieldAlert', component: ShieldAlert },
  { name: 'ShieldX', component: ShieldX },
  { name: 'MoonStar', component: MoonStar },
  { name: 'SunMoon', component: SunMoon },
  { name: 'Paintbrush', component: Paintbrush },
  { name: 'Pipette', component: Pipette },
  { name: 'SwatchBook', component: SwatchBook },
  { name: 'Contrast', component: Contrast },
  { name: 'AlignLeft', component: AlignLeft },
  { name: 'AlignCenter', component: AlignCenter },
  { name: 'AlignRight', component: AlignRight },
  { name: 'AlignJustify', component: AlignJustify },
  { name: 'AlignVerticalJustifyCenter', component: AlignVerticalJustifyCenter },
  { name: 'AlignHorizontalJustifyCenter', component: AlignHorizontalJustifyCenter },
  { name: 'SortAsc', component: SortAsc },
  { name: 'SortDesc', component: SortDesc },
  { name: 'List', component: List },
  { name: 'ListOrdered', component: ListOrdered },
  { name: 'ListChecks', component: ListChecks },
  { name: 'ListTree', component: ListTree },
  { name: 'CalendarDays', component: CalendarDays },
  { name: 'CalendarCheck', component: CalendarCheck },
  { name: 'CalendarX', component: CalendarX },
  { name: 'CalendarPlus', component: CalendarPlus },
  { name: 'Timer', component: Timer },
  { name: 'Hourglass', component: Hourglass },
  { name: 'BarChart', component: BarChart },
  { name: 'BarChart2', component: BarChart2 },
  { name: 'BarChart3', component: BarChart3 },
  { name: 'LineChart', component: LineChart },
  { name: 'PieChart', component: PieChart },
  { name: 'TrendingUp', component: TrendingUp },
  { name: 'TrendingDown', component: TrendingDown },
  { name: 'Activity', component: Activity },
  { name: 'SkipForward', component: SkipForward },
  { name: 'SkipBack', component: SkipBack },
  { name: 'FastForward', component: FastForward },
  { name: 'Rewind', component: Rewind },
  { name: 'Volume', component: Volume },
  { name: 'Volume1', component: Volume1 },
  { name: 'Volume2', component: Volume2 },
  { name: 'VolumeX', component: VolumeX },
  { name: 'Music', component: Music },
]

// 图标大小选项
const sizes = [16, 24, 32, 48, 64]

// 图标颜色选项
const colors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00']

// 动态图标选择
const iconNames = ['Home', 'User', 'Settings', 'Search', 'Heart', 'Star', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'Menu', 'MoreHorizontal', 'MoreVertical', 'Plus', 'Minus', 'X', 'Check', 'Copy', 'Clipboard', 'Save', 'Trash', 'Edit', 'Eye', 'EyeOff', 'File', 'FileText', 'Folder', 'FolderOpen', 'Mail', 'Bell', 'Circle', 'CircleCheck', 'CircleX', 'Square', 'SquareCheck', 'LockOpen', 'Sun', 'Moon', 'Palette', 'Calendar', 'Clock', 'Play', 'Pause', 'Image', 'Share', 'Link', 'Tag', 'Grid', 'Code', 'ShoppingCart', 'CreditCard', 'Wifi', 'Power', 'Cloud', 'Award', 'Briefcase', 'Camera', 'Key', 'ArrowLeftToLine', 'ArrowRightLeft', 'ArrowRightToLine', 'ArrowUpToLine', 'ArrowUpDown', 'ArrowDownUp', 'ArrowBigDown', 'ArrowBigLeft', 'ArrowBigRight', 'ArrowBigUp', 'ChevronsDown', 'ChevronsLeft', 'ChevronsRight', 'ChevronsUp', 'ChevronsUpDown', 'CornerDownLeft', 'CornerDownRight', 'CornerLeftDown', 'CornerLeftUp', 'CornerRightDown', 'CornerRightUp', 'CornerUpLeft', 'CornerUpRight', 'MenuSquare', 'Ellipsis', 'PanelLeft', 'PanelRight', 'PanelTop', 'PanelBottom', 'PanelLeftClose', 'PanelLeftOpen', 'PanelRightClose', 'PanelRightOpen', 'Sidebar', 'SidebarClose', 'SidebarOpen', 'MdiMenuClose', 'MdiMenuOpen', 'Trash2', 'Edit2', 'Edit3', 'Pencil', 'PencilLine', 'SearchX', 'Filter', 'FilterX', 'SlidersHorizontal', 'SlidersVertical', 'RotateCw', 'RotateCcw', 'RefreshCw', 'RefreshCcw', 'Loader', 'Loader2', 'LoaderCircle', 'View', 'Maximize', 'Maximize2', 'Minimize', 'Minimize2', 'Expand', 'Shrink', 'Fullscreen', 'ZoomIn', 'ZoomOut', 'Files', 'FolderClosed', 'FolderPlus', 'FolderMinus', 'FileEdit', 'FilePlus', 'FileMinus', 'FileCheck', 'FileX', 'BookOpenText', 'Book', 'BookOpen', 'UserRound', 'UserRoundPen', 'UserPlus', 'UserMinus', 'UserCheck', 'UserX', 'Users', 'UsersRound', 'UserCircle', 'UserSquare', 'Settings2', 'Sliders', 'Wrench', 'Cog', 'BellOff', 'BellRing', 'MailOpen', 'MailCheck', 'MailX', 'MailPlus', 'Inbox', 'Send', 'MessageSquare', 'MessageCircle', 'Comment', 'Link2', 'Unlink', 'ExternalLink', 'Compass', 'Map', 'MapPin', 'Navigation', 'Tags', 'Bookmark', 'BookmarkPlus', 'Flag', 'Pin', 'PinOff', 'Grid2x2', 'LayoutGrid', 'LayoutList', 'LayoutDashboard', 'Columns', 'Rows', 'Code2', 'Terminal', 'FileCode', 'Braces', 'Bug', 'GitBranch', 'GitCommit', 'GitMerge', 'GitPullRequest', 'Github', 'ShoppingBag', 'DollarSign', 'Package', 'Box', 'WifiOff', 'Signal', 'Bluetooth', 'Cast', 'Radio', 'Antenna', 'PowerOff', 'Battery', 'BatteryCharging', 'BatteryFull', 'BatteryLow', 'Zap', 'CloudRain', 'CloudSnow', 'CloudSun', 'CloudMoon', 'BadgeCheck', 'Building', 'Video', 'Share2', 'ThumbsUp', 'ThumbsDown', 'ClipboardCopy', 'ClipboardCheck', 'ClipboardList', 'CircleAlert', 'CircleCheckBig', 'CircleHelp', 'CircleDot', 'SquareCheckBig', 'SquareMinus', 'SquarePlus', 'SquareX', 'CheckCircle', 'CheckSquare', 'AlertCircle', 'AlertTriangle', 'Info', 'HelpCircle', 'XCircle', 'XSquare', 'LockKeyhole', 'Unlock', 'KeyRound', 'Shield', 'ShieldCheck', 'ShieldAlert', 'ShieldX', 'MoonStar', 'SunMoon', 'Paintbrush', 'Pipette', 'SwatchBook', 'Contrast', 'AlignLeft', 'AlignCenter', 'AlignRight', 'AlignJustify', 'AlignVerticalJustifyCenter', 'AlignHorizontalJustifyCenter', 'SortAsc', 'SortDesc', 'List', 'ListOrdered', 'ListChecks', 'ListTree', 'CalendarDays', 'CalendarCheck', 'CalendarX', 'CalendarPlus', 'Timer', 'Hourglass', 'BarChart', 'BarChart2', 'BarChart3', 'LineChart', 'PieChart', 'TrendingUp', 'TrendingDown', 'Activity', 'SkipForward', 'SkipBack', 'FastForward', 'Rewind', 'Volume', 'Volume1', 'Volume2', 'VolumeX', 'Music', 'Grip', 'GripVertical', 'GripHorizontal', 'Move', 'FoldHorizontal', 'FoldVertical', 'UnfoldHorizontal', 'UnfoldVertical', 'InspectionPanel']
const currentIconName = ref('Home')

const currentIcon = computed(() => {
  const iconMap: Record<string, any> = {
    Home,
    User,
    Settings,
    Search,
    Heart,
    Star,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Menu,
    MoreHorizontal,
    MoreVertical,
    Plus,
    Minus,
    X,
    Check,
    Copy,
    Clipboard,
    Save,
    Trash,
    Edit,
    Eye,
    EyeOff,
    File,
    FileText,
    Folder,

    FolderOpen,
    Mail,
    Bell,
    Circle,
    CircleCheck,
    CircleX,
    Square,
    SquareCheck,
    LockOpen,
    Key,
    Sun,
    Moon,
    Palette,
    Calendar,
    Clock,
    Play,
    Pause,
    Image,
    Share,
    Link,
    Tag,
    Grid,
    Code,
    ShoppingCart,
    CreditCard,
    Wifi,
    Power,
    Cloud,
    Award,
    Briefcase,
    Camera,
    Phone,
    Smartphone,
    Tablet,
    Laptop,
    Monitor,
    Printer,
    Languages,
    Globe,
    Grip,
    GripVertical,
    GripHorizontal,
    Move,
    FoldHorizontal,
    FoldVertical,
    UnfoldHorizontal,
    UnfoldVertical,
    InspectionPanel,
    LogOut,
    LogIn,
    // 添加之前导入但未使用的图标
    ArrowLeftToLine,
    ArrowRightLeft,
    ArrowRightToLine,
    ArrowUpToLine,
    ArrowUpDown,
    ArrowDownUp,
    ArrowBigDown,
    ArrowBigLeft,
    ArrowBigRight,
    ArrowBigUp,
    ChevronsDown,
    ChevronsLeft,
    ChevronsRight,
    ChevronsUp,
    ChevronsUpDown,
    CornerDownLeft,
    CornerDownRight,
    CornerLeftDown,
    CornerLeftUp,
    CornerRightDown,
    CornerRightUp,
    CornerUpLeft,
    CornerUpRight,
    MenuSquare,
    Ellipsis,
    PanelLeft,
    PanelRight,
    PanelTop,
    PanelBottom,
    PanelLeftClose,
    PanelLeftOpen,
    PanelRightClose,
    PanelRightOpen,
    Sidebar,
    SidebarClose,
    SidebarOpen,
    MdiMenuClose,
    MdiMenuOpen,
    Trash2,
    Edit2,
    Edit3,
    Pencil,
    PencilLine,
    SearchX,
    Filter,
    FilterX,
    SlidersHorizontal,
    SlidersVertical,
    RotateCw,
    RotateCcw,
    RefreshCw,
    RefreshCcw,
    Loader,
    Loader2,
    LoaderCircle,
    View,
    Maximize,
    Maximize2,
    Minimize,
    Minimize2,
    Expand,
    Shrink,
    Fullscreen,
    ZoomIn,
    ZoomOut,
    Files,
    FolderClosed,
    FolderPlus,
    FolderMinus,
    FileEdit,
    FilePlus,
    FileMinus,
    FileCheck,
    FileX,
    BookOpenText,
    Book,
    BookOpen,
    UserRound,
    UserRoundPen,
    UserPlus,
    UserMinus,
    UserCheck,
    UserX,
    Users,
    UsersRound,
    UserCircle,
    UserSquare,
    Settings2,
    Sliders,
    Wrench,
    Cog,
    BellOff,
    BellRing,
    MailOpen,
    MailCheck,
    MailX,
    MailPlus,
    Inbox,
    Send,
    MessageSquare,
    MessageCircle,
    Comment,

    Link2,
    Unlink,
    ExternalLink,
    Compass,
    Map,
    MapPin,
    Navigation,
    Tags,
    Bookmark,
    BookmarkPlus,
    Flag,
    Pin,
    PinOff,
    Grid2x2,
    LayoutGrid,
    LayoutList,
    LayoutDashboard,
    Columns,
    Rows,
    Code2,
    Terminal,
    FileCode,
    Braces,
    Bug,
    GitBranch,
    GitCommit,
    GitMerge,
    GitPullRequest,
    Github,
    ShoppingBag,
    DollarSign,
    Package,
    Box,
    WifiOff,
    Signal,
    Bluetooth,
    Cast,
    Radio,
    Antenna,
    PowerOff,
    Battery,
    BatteryCharging,
    BatteryFull,
    BatteryLow,
    Zap,
    CloudRain,
    CloudSnow,
    CloudSun,
    CloudMoon,
    BadgeCheck,
    Building,
    Video,
    Share2,
    ThumbsUp,
    ThumbsDown,
    ClipboardCopy,
    ClipboardCheck,
    ClipboardList,
    CircleAlert,
    CircleCheckBig,
    CircleHelp,
    CircleDot,
    SquareCheckBig,
    SquareMinus,
    SquarePlus,
    SquareX,
    CheckCircle,
    CheckSquare,
    AlertCircle,
    AlertTriangle,
    Info,
    HelpCircle,
    XCircle,
    XSquare,
    LockKeyhole,
    Unlock,
    KeyRound,
    Shield,
    ShieldCheck,
    ShieldAlert,
    ShieldX,
    MoonStar,
    SunMoon,
    Paintbrush,
    Pipette,
    SwatchBook,
    Contrast,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    AlignVerticalJustifyCenter,
    AlignHorizontalJustifyCenter,
    SortAsc,
    SortDesc,
    List,
    ListOrdered,
    ListChecks,
    ListTree,
    CalendarDays,
    CalendarCheck,
    CalendarX,
    CalendarPlus,
    Timer,
    Hourglass,
    BarChart,
    BarChart2,
    BarChart3,
    LineChart,
    PieChart,
    TrendingUp,
    TrendingDown,
    Activity,
    SkipForward,
    SkipBack,
    FastForward,
    Rewind,
    Volume,
    Volume1,
    Volume2,
    VolumeX,
    Music
  }
  return iconMap[currentIconName.value] || Home
})

// 创建自定义图标
const customIcon = createIconifyIcon('mdi:account-circle')

// 显示提示信息
const showMessage = (text: string) => {
  // 创建提示容器
  const messageContainer = document.createElement('div');
  messageContainer.style.position = 'fixed';
  messageContainer.style.top = '20px';
  messageContainer.style.left = '50%';
  messageContainer.style.transform = 'translateX(-50%)';
  messageContainer.style.zIndex = '1000';
  messageContainer.style.width = 'auto';
  messageContainer.style.maxWidth = '80%';
  messageContainer.style.display = 'flex';
  messageContainer.style.alignItems = 'center';
  messageContainer.style.justifyContent = 'center';
  
  // 创建提示元素
  const messageEl = document.createElement('div');
  messageEl.textContent = text;
  messageEl.style.backgroundColor = 'rgba(25, 118, 210, 0.95)';
  messageEl.style.color = 'white';
  messageEl.style.padding = '14px 28px';
  messageEl.style.borderRadius = '8px';
  messageEl.style.fontSize = '15px';
  messageEl.style.fontWeight = '500';
  messageEl.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
  messageEl.style.backdropFilter = 'blur(10px)';
  messageEl.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  messageEl.style.opacity = '0';
  messageEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  messageEl.style.transform = 'translateY(-10px)';
  
  messageContainer.appendChild(messageEl);
  document.body.appendChild(messageContainer);
  
  // 触发显示动画
  setTimeout(() => {
    messageEl.style.opacity = '1';
    messageEl.style.transform = 'translateY(0)';
  }, 10);
  
  // 3秒后移除提示
  setTimeout(() => {
    messageEl.style.opacity = '0';
    messageEl.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      document.body.removeChild(messageContainer);
    }, 300);
  }, 3000);
};

// 复制图标名称到剪贴板
const copyIconName = async (name: string) => {
  try {
    await navigator.clipboard.writeText(name);
    showMessage(`图标名称 ${name} 已复制到剪贴板`);
  } catch (err) {
    console.error('复制失败:', err);
    // 如果 navigator.clipboard 不可用，回退到旧方法
    const textArea = document.createElement('textarea');
    textArea.value = name;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showMessage(`图标名称 ${name} 已复制到剪贴板`);
    } catch (fallbackErr) {
      console.error('回退复制方法也失败:', fallbackErr);
      showMessage('复制失败，请手动复制');
    }
    document.body.removeChild(textArea);
  }
}

// 安全获取组件的函数
const safeGetComponent = (component: any) => {
  // 简化安全检查，只检查是否存在
  if (!component) return null;
  
  // 对于有问题的组件，我们可以在这里单独处理
  try {
    // 确保组件可以被使用
    return component;
  } catch (e) {
    console.error('Error rendering component:', e);
    return null;
  }
}
</script>

<style scoped>
.icons-demo {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

h2 {
  color: #34495e;
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
}

.section {
  margin-bottom: 40px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.section:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #3498db;
  font-size: 1.4rem;
  margin-bottom: 20px;
  text-align: center;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 20px;
  padding: 10px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: default;
}

.icon-item:hover {
  transform: translateY(-5px);
  background: #e3f2fd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon-item span {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #555;
  text-align: center;
}

.icon-sizes {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
}

.icon-colors {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
}

.dynamic-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.icon-selector {
  padding: 12px 16px;
  border: 2px solid #3498db;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-selector:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.custom-icon {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 为不同图标类别添加不同颜色背景 */
.section:nth-child(odd) {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
}

.section:nth-child(even) {
  background: linear-gradient(135deg, #f8f9fa 0%, #e8eaf6 100%);
}

.clickable-icon {
  cursor: pointer;
  transition: all 0.2s ease;
}

.clickable-icon:hover {
  transform: scale(1.2);
  opacity: 0.8;
}

.clickable-name {
  cursor: pointer;
  transition: all 0.2s ease;
  color: #3498db;
}

.clickable-name:hover {
  color: #2980b9;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 15px;
  }
  
  .icon-sizes,
  .icon-colors {
    gap: 20px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .section {
    padding: 20px;
  }
}
</style>